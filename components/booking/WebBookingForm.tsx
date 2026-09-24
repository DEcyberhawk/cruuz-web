"use client";

import {
  FormEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Accessibility,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Car,
  Check,
  CreditCard,
  LocateFixed,
  MapPin,
  Navigation,
  Package,
  Plane,
  Plus,
  Route,
  Search,
  ShieldCheck,
  Timer,
  Trash2,
  Users,
} from "lucide-react";

import {
  GhanaLandmark,
  searchGhanaLandmarks,
} from "@/lib/ghana-landmarks";

type BookingMode = "NOW" | "SCHEDULED";

type PaymentMethod =
  | "CASH"
  | "WALLET"
  | "CARD"
  | "MTN_MOMO"
  | "TELECEL_CASH"
  | "AIRTELTIGO_MONEY";

type CreatedTrip = {
  id: string;
  status: string;
  tripVerificationCode?: string;
  estimatedFare?: number;
  finalFare?: number;
  currency?: string;
};

type RideType =
  | "CRUUZ_GO"
  | "COMFORT"
  | "CRUUZ_XL"
  | "EXECUTIVE"
  | "AIRPORT"
  | "BUSINESS"
  | "DELIVERY"
  | "ACCESS"
  | "HOURLY";

type PricingRideTypeId =
  | "GO"
  | "COMFORT"
  | "XL"
  | "EXEC"
  | "AIRPORT"
  | "DELIVERY"
  | "ACCESS"
  | "HOURLY";

type PricingEstimate = {
  rideTypeId: PricingRideTypeId;
  currency: "GHS";
  baseFare: number;
  distanceFare: number;
  timeFare: number;
  totalFare: number;
  formattedFare: string;
  etaMinutes: number;
};

type AutomaticCampaignValidation = {
  valid: boolean;
  campaignId?: string;
  promoCode?: string;
  campaignName?: string;
  originalFare: number;
  discountAmount: number;
  finalFare: number;
  currency: "GHS";
  message?: string;
};

type RouteInfo = {
  distanceKm: number;
  durationMinutes: number;
};

type GeoapifyFeature = {
  type: "Feature";
  properties: {
    name?: string;
    formatted?: string;
    address_line1?: string;
    address_line2?: string;
    category?: string;
    result_type?: string;
    city?: string;
    suburb?: string;
    state?: string;
    country?: string;
    place_id?: string;
    lat?: number;
    lon?: number;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
};

type SearchSuggestion = {
  id: string;
  name: string;
  address: string;
  category?: string;
  latitude: number;
  longitude: number;
  source: "CRUUZ" | "GEOAPIFY";
};

type SelectedPlace = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  source: "CRUUZ" | "GEOAPIFY" | "GPS";
};

type StopDraft = {
  id: string;
  text: string;
  place: SelectedPlace | null;
  suggestions: SearchSuggestion[];
  searching: boolean;
};

const MAX_INTERMEDIATE_STOPS = 3;

const GOOGLE_MAPS_WEB_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

const GEOAPIFY_KEY =
  process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY || "";

const CRUUZ_API_URL = (
  process.env.NEXT_PUBLIC_CRUUZ_API_URL || ""
).replace(/\/$/, "");

const PAYSTACK_LIVE_ENABLED =
  process.env.NEXT_PUBLIC_PAYSTACK_LIVE_ENABLED === "true";

const WEB_AUTH_TOKEN_KEY = "cruuz_web_access_token";
const WEB_VERIFIED_PHONE_KEY = "cruuz_web_verified_phone";
const WEB_PENDING_PAYMENT_KEY = "cruuz_web_pending_payment";

const PAYMENT_METHODS: Array<{
  id: PaymentMethod;
  title: string;
  subtitle: string;
}> = [
  { id: "CASH", title: "Cash", subtitle: "Pay the driver directly" },
  { id: "WALLET", title: "CRUUZ Wallet", subtitle: "Use your CRUUZ balance" },
  { id: "CARD", title: "Card", subtitle: "Visa, Mastercard and more" },
  { id: "MTN_MOMO", title: "MTN MoMo", subtitle: "Pay with MTN Mobile Money" },
  { id: "TELECEL_CASH", title: "Telecel Cash", subtitle: "Pay with Telecel Cash" },
  { id: "AIRTELTIGO_MONEY", title: "AirtelTigo Money", subtitle: "Pay with AirtelTigo Money" },
];

const PREPAID_PAYMENT_METHODS: PaymentMethod[] = [
  "CARD",
  "MTN_MOMO",
  "TELECEL_CASH",
  "AIRTELTIGO_MONEY",
];

const ACCRA_CENTER: [number, number] = [-0.187, 5.6037];

type GoogleMapsWindow = Window & {
  google?: any;
  __cruuzGoogleMapsPromise?: Promise<void>;
};

function loadGoogleMaps(): Promise<void> {
  const browserWindow = window as GoogleMapsWindow;

  if (browserWindow.google?.maps) {
    return Promise.resolve();
  }

  if (browserWindow.__cruuzGoogleMapsPromise) {
    return browserWindow.__cruuzGoogleMapsPromise;
  }

  browserWindow.__cruuzGoogleMapsPromise = new Promise(
    (resolve, reject) => {
      const script = document.createElement("script");
      script.id = "cruuz-google-maps";
      script.src =
        "https://maps.googleapis.com/maps/api/js?" +
        new URLSearchParams({
          key: GOOGLE_MAPS_WEB_KEY,
          v: "weekly",
        }).toString();
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error("Google Maps failed to load"));
      document.head.appendChild(script);
    }
  );

  return browserWindow.__cruuzGoogleMapsPromise;
}

const GOOGLE_MAP_DARK_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#17171d" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#17171d" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#a8a8b3" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2b2b35" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#d1d1da" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0f172a" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#9ca3af" }] },
];

const PRICING_TYPE_MAP: Record<
  RideType,
  PricingRideTypeId | null
> = {
  CRUUZ_GO: "GO",
  COMFORT: "COMFORT",
  CRUUZ_XL: "XL",
  EXECUTIVE: "EXEC",
  AIRPORT: "AIRPORT",
  BUSINESS: null,
  DELIVERY: "DELIVERY",
  ACCESS: "ACCESS",
  HOURLY: "HOURLY",
};

const rideTypes: Array<{
  id: RideType;
  name: string;
  description: string;
  icon: ReactNode;
}> = [
  {
    id: "CRUUZ_GO",
    name: "CRUUZ GO",
    description: "Affordable everyday rides",
    icon: <Car className="h-5 w-5" />,
  },
  {
    id: "COMFORT",
    name: "CRUUZ Comfort",
    description: "More comfort for your journey",
    icon: <Car className="h-5 w-5" />,
  },
  {
    id: "CRUUZ_XL",
    name: "CRUUZ XL",
    description: "More room for groups and luggage",
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: "EXECUTIVE",
    name: "Executive",
    description: "Premium business-class travel",
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
  {
    id: "AIRPORT",
    name: "Airport",
    description: "Airport pickup and transfer",
    icon: <Plane className="h-5 w-5" />,
  },
  {
    id: "BUSINESS",
    name: "Business",
    description: "Corporate and company travel",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    id: "DELIVERY",
    name: "Delivery",
    description: "Send packages across the city",
    icon: <Package className="h-5 w-5" />,
  },
  {
    id: "ACCESS",
    name: "Access",
    description: "Accessible mobility support",
    icon: <Accessibility className="h-5 w-5" />,
  },
  {
    id: "HOURLY",
    name: "Hourly",
    description: "Keep a vehicle by the hour",
    icon: <Timer className="h-5 w-5" />,
  },
];

export default function WebBookingForm() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);

  const pickupMarkerRef = useRef<any>(null);
  const destinationMarkerRef =
    useRef<any>(null);
  const stopMarkerRefs = useRef<Map<string, any>>(new Map());
  const routePolylineRef = useRef<any>(null);

  const pickupSearchAbortRef =
    useRef<AbortController | null>(null);
  const destinationSearchAbortRef =
    useRef<AbortController | null>(null);
  const stopSearchAbortRefs =
    useRef<Map<string, AbortController>>(new Map());
  const stopSearchTimeoutRefs =
    useRef<Map<string, number>>(new Map());
  const nextStopIdRef = useRef(1);
  const pricingAbortRef =
  useRef<AbortController | null>(null);

const campaignPreviewAbortRef =
  useRef<AbortController | null>(null);

const routeAbortRef =
  useRef<AbortController | null>(null);

  const [bookingMode, setBookingMode] =
    useState<BookingMode>("NOW");

  const [rideType, setRideType] =
    useState<RideType>("CRUUZ_GO");

  const [pickupText, setPickupText] = useState("");
  const [destinationText, setDestinationText] =
    useState("");

  const [pickup, setPickup] =
    useState<SelectedPlace | null>(null);

  const [destination, setDestination] =
    useState<SelectedPlace | null>(null);

  const [stops, setStops] = useState<StopDraft[]>([]);

  const [pickupSuggestions, setPickupSuggestions] =
    useState<SearchSuggestion[]>([]);

  const [
    destinationSuggestions,
    setDestinationSuggestions,
  ] = useState<SearchSuggestion[]>([]);

  const [pickupSearching, setPickupSearching] =
    useState(false);

  const [
    destinationSearching,
    setDestinationSearching,
  ] = useState(false);

  const [routeInfo, setRouteInfo] =
    useState<RouteInfo | null>(null);

  const [routeLoading, setRouteLoading] =
    useState(false);

  const [pricing, setPricing] =
    useState<PricingEstimate[]>([]);

  const [pricingLoading, setPricingLoading] =
    useState(false);

  const [pricingError, setPricingError] =
    useState<string | null>(null);

const [
  automaticBenefit,
  setAutomaticBenefit,
] = useState<AutomaticCampaignValidation | null>(
  null
);

const [
  automaticBenefitLoading,
  setAutomaticBenefitLoading,
] = useState(false);

  const [scheduledDate, setScheduledDate] =
    useState("");

  const [scheduledTime, setScheduledTime] =
    useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [bookingBusy, setBookingBusy] = useState(false);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("CASH");
  const [pendingPaymentReference, setPendingPaymentReference] =
    useState("");
  const [createdTrip, setCreatedTrip] =
    useState<CreatedTrip | null>(null);

  const [deliveryRecipient, setDeliveryRecipient] =
    useState("");

  const [deliveryPhone, setDeliveryPhone] =
    useState("");

  const [accessNotes, setAccessNotes] = useState("");

  const [hourlyHours, setHourlyHours] = useState("1");

  const [message, setMessage] = useState<string | null>(
    null
  );

  const selectedPricingId =
    PRICING_TYPE_MAP[rideType];

  useEffect(() => {
    const savedToken = window.localStorage.getItem(WEB_AUTH_TOKEN_KEY) || "";
    const savedPhone =
      window.localStorage.getItem(WEB_VERIFIED_PHONE_KEY) || "";
    const savedPayment =
      window.localStorage.getItem(WEB_PENDING_PAYMENT_KEY) || "";

    setAccessToken(savedToken);
    setVerifiedPhone(savedPhone);
    setPendingPaymentReference(savedPayment);
  }, []);

  const selectedFare = useMemo(() => {
    if (!selectedPricingId) return null;

    return (
      pricing.find(
        (item) =>
          item.rideTypeId === selectedPricingId
      ) || null
    );
  }, [pricing, selectedPricingId]);

  useEffect(() => {
    if (!GOOGLE_MAPS_WEB_KEY || !mapContainerRef.current) {
      return;
    }

    let active = true;

    void loadGoogleMaps()
      .then(() => {
        const browserWindow = window as GoogleMapsWindow;
        if (
          !active ||
          !browserWindow.google?.maps ||
          !mapContainerRef.current
        ) {
          return;
        }

        mapRef.current = new browserWindow.google.maps.Map(
          mapContainerRef.current,
          {
            center: {
              lat: ACCRA_CENTER[1],
              lng: ACCRA_CENTER[0],
            },
            zoom: 11,
            styles: GOOGLE_MAP_DARK_STYLE,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
          }
        );
      })
      .catch(() => {
        if (active) {
          setMessage(
            "Google Maps could not load. Please refresh and try again."
          );
        }
      });

    return () => {
      active = false;
      pickupMarkerRef.current?.setMap(null);
      destinationMarkerRef.current?.setMap(null);
      stopMarkerRefs.current.forEach((marker) => marker.setMap(null));
      stopMarkerRefs.current.clear();
      stopSearchAbortRefs.current.forEach((controller) => controller.abort());
      stopSearchTimeoutRefs.current.forEach((timeout) =>
        window.clearTimeout(timeout)
      );
      routePolylineRef.current?.setMap(null);
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (
      pickup &&
      normalizeKey(pickupText) ===
        normalizeKey(pickup.name)
    ) {
      return;
    }

    if (pickupText.trim().length < 2) {
      pickupSearchAbortRef.current?.abort();
      setPickupSuggestions([]);
      setPickupSearching(false);
      return;
    }

    const timeout = window.setTimeout(() => {
      void searchLocation(
        pickupText,
        "pickup"
      );
    }, 300);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [pickupText, pickup]);

  useEffect(() => {
    if (
      destination &&
      normalizeKey(destinationText) ===
        normalizeKey(destination.name)
    ) {
      return;
    }

    if (destinationText.trim().length < 2) {
      destinationSearchAbortRef.current?.abort();
      setDestinationSuggestions([]);
      setDestinationSearching(false);
      return;
    }

    const timeout = window.setTimeout(() => {
      void searchLocation(
        destinationText,
        "destination"
      );
    }, 300);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [destinationText, destination]);

  const routeStopsKey = stops
    .map((stop) =>
      stop.place
        ? `${stop.place.latitude},${stop.place.longitude}`
        : "pending"
    )
    .join("|");

  useEffect(() => {
    const selectedStops = stops
      .map((stop) => stop.place)
      .filter((place): place is SelectedPlace => Boolean(place));

    if (
      !pickup ||
      !destination ||
      selectedStops.length !== stops.length
    ) {
      routeAbortRef.current?.abort();
      clearRoute();
      setRouteInfo(null);
      setPricing([]);
      setPricingError(null);
      return;
    }

    void calculateRoute(pickup, destination, selectedStops);
  }, [pickup, destination, routeStopsKey]);

  useEffect(() => {
    if (!routeInfo) {
      pricingAbortRef.current?.abort();
      setPricing([]);
      return;
    }

    void loadPricing(routeInfo);
  }, [routeInfo]);


useEffect(() => {
  campaignPreviewAbortRef.current?.abort();
  setAutomaticBenefit(null);
  setAutomaticBenefitLoading(false);

  if (
    !selectedFare ||
    !selectedPricingId ||
    selectedPricingId === "DELIVERY" ||
    !CRUUZ_API_URL
  ) {
    return;
  }

  const token = localStorage.getItem(
    "cruuz_web_token"
  );

  if (!token) {
    return;
  }

  const controller = new AbortController();
  campaignPreviewAbortRef.current = controller;

  async function loadAutomaticBenefit() {
    setAutomaticBenefitLoading(true);

    try {
      const response = await fetch(
        `${CRUUZ_API_URL}/campaigns/automatic-preview`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            originalFare: selectedFare!.totalFare,
            rideTypeId: selectedPricingId,
          }),
          signal: controller.signal,
        }
      );

      const data = await response.json();

      if (controller.signal.aborted) {
        return;
      }

      if (
        response.ok &&
        data.success &&
        data.validation?.valid
      ) {
        setAutomaticBenefit(
          data.validation as AutomaticCampaignValidation
        );
      } else {
        setAutomaticBenefit(null);
      }
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }

      setAutomaticBenefit(null);
    } finally {
      if (!controller.signal.aborted) {
        setAutomaticBenefitLoading(false);
      }
    }
  }

  void loadAutomaticBenefit();

  return () => {
    controller.abort();
  };
}, [selectedFare, selectedPricingId]);

  async function searchLocation(
    query: string,
    field: "pickup" | "destination"
  ) {
    const trimmed = query.trim();
    if (trimmed.length < 2) return;

    const localResults = searchGhanaLandmarks(
      trimmed,
      6
    ).map(mapLocalLandmark);

    if (field === "pickup") {
      pickupSearchAbortRef.current?.abort();

      const controller = new AbortController();
      pickupSearchAbortRef.current = controller;

      setPickupSuggestions(localResults);
      setPickupSearching(true);

      try {
        const remoteResults =
          await searchGhanaLocations(
            trimmed,
            controller.signal
          );

        if (controller.signal.aborted) return;

        setPickupSuggestions(
          dedupeSuggestions([
            ...localResults,
            ...remoteResults,
          ])
        );
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        setPickupSuggestions(localResults);
      } finally {
        if (!controller.signal.aborted) {
          setPickupSearching(false);
        }
      }

      return;
    }

    destinationSearchAbortRef.current?.abort();

    const controller = new AbortController();
    destinationSearchAbortRef.current = controller;

    setDestinationSuggestions(localResults);
    setDestinationSearching(true);

    try {
      const remoteResults =
        await searchGhanaLocations(
          trimmed,
          controller.signal
        );

      if (controller.signal.aborted) return;

      setDestinationSuggestions(
        dedupeSuggestions([
          ...localResults,
          ...remoteResults,
        ])
      );
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }

      setDestinationSuggestions(localResults);
    } finally {
      if (!controller.signal.aborted) {
        setDestinationSearching(false);
      }
    }
  }

  async function searchGhanaLocations(
    query: string,
    signal: AbortSignal
  ): Promise<SearchSuggestion[]> {
    const results = await Promise.allSettled([
      searchCruuzGooglePlaces(query, signal),
      searchGeoapify(query, signal),
    ]);

    return dedupeSuggestions(
      results.flatMap((result) =>
        result.status === "fulfilled" ? result.value : []
      )
    );
  }

  async function searchCruuzGooglePlaces(
    query: string,
    signal: AbortSignal
  ): Promise<SearchSuggestion[]> {
    if (!CRUUZ_API_URL) return [];

    const params = new URLSearchParams({ q: query });
    const response = await fetch(
      `${CRUUZ_API_URL}/maps/public/search-places?${params.toString()}`,
      { signal }
    );

    if (!response.ok) {
      throw new Error("CRUUZ Google Places search failed");
    }

    const data = (await response.json()) as {
      success?: boolean;
      places?: Array<{
        id: string;
        title: string;
        subtitle: string;
        latitude: number;
        longitude: number;
      }>;
    };

    if (!data.success || !Array.isArray(data.places)) {
      return [];
    }

    return data.places.map((place) => ({
      id: `google-${place.id}`,
      name: place.title,
      address: place.subtitle,
      category: "place",
      latitude: place.latitude,
      longitude: place.longitude,
      source: "CRUUZ" as const,
    }));
  }

  async function searchGeoapify(
    query: string,
    signal: AbortSignal
  ): Promise<SearchSuggestion[]> {
    if (!GEOAPIFY_KEY) return [];

    const params = new URLSearchParams({
      text: `${query}, Ghana`,
      filter: "countrycode:gh",
      limit: "10",
      format: "geojson",
      apiKey: GEOAPIFY_KEY,
    });

    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?${params.toString()}`,
      { signal }
    );

    if (!response.ok) {
      throw new Error("Geoapify location search failed");
    }

    const data = (await response.json()) as {
      features?: GeoapifyFeature[];
    };

    return (data.features || [])
      .filter(
        (feature) =>
          Array.isArray(feature.geometry.coordinates) &&
          feature.geometry.coordinates.length >= 2
      )
      .map((feature) => {
        const [longitude, latitude] =
          feature.geometry.coordinates;
        const properties = feature.properties;
        const name =
          properties.name ||
          properties.address_line1 ||
          properties.city ||
          properties.suburb ||
          properties.formatted ||
          query;

        return {
          id:
            properties.place_id ||
            `geoapify-${longitude}-${latitude}-${name}`,
          name,
          address:
            properties.formatted ||
            [properties.address_line1, properties.address_line2]
              .filter(Boolean)
              .join(", "),
          category:
            properties.category || properties.result_type,
          longitude,
          latitude,
          source: "GEOAPIFY" as const,
        };
      });
  }

  function chooseSuggestion(
    suggestion: SearchSuggestion,
    field: "pickup" | "destination"
  ) {
    const place: SelectedPlace = {
      id: suggestion.id,
      name: suggestion.name,
      address: suggestion.address,
      latitude: suggestion.latitude,
      longitude: suggestion.longitude,
      source: suggestion.source,
    };

    if (field === "pickup") {
      setPickup(place);
      setPickupText(place.name);
      setPickupSuggestions([]);
      placeMarker(place, "pickup");
      return;
    }

    setDestination(place);
    setDestinationText(place.name);
    setDestinationSuggestions([]);
    placeMarker(place, "destination");
  }

  function addStop() {
    if (stops.length >= MAX_INTERMEDIATE_STOPS) return;

    const id = `stop-${nextStopIdRef.current++}`;
    setStops((current) => [
      ...current,
      {
        id,
        text: "",
        place: null,
        suggestions: [],
        searching: false,
      },
    ]);
  }

  function removeStop(id: string) {
    stopSearchAbortRefs.current.get(id)?.abort();
    stopSearchAbortRefs.current.delete(id);

    const timeout = stopSearchTimeoutRefs.current.get(id);
    if (timeout) window.clearTimeout(timeout);
    stopSearchTimeoutRefs.current.delete(id);

    stopMarkerRefs.current.get(id)?.setMap(null);
    stopMarkerRefs.current.delete(id);
    setStops((current) => current.filter((stop) => stop.id !== id));
  }

  function updateStopText(id: string, value: string) {
    setStops((current) =>
      current.map((stop) => {
        if (stop.id !== id) return stop;

        const selectionChanged =
          stop.place && normalizeKey(value) !== normalizeKey(stop.place.name);

        if (selectionChanged) {
          stopMarkerRefs.current.get(id)?.setMap(null);
          stopMarkerRefs.current.delete(id);
        }

        return {
          ...stop,
          text: value,
          place: selectionChanged ? null : stop.place,
        };
      })
    );

    const previousTimeout = stopSearchTimeoutRefs.current.get(id);
    if (previousTimeout) window.clearTimeout(previousTimeout);

    if (value.trim().length < 2) {
      stopSearchAbortRefs.current.get(id)?.abort();
      setStops((current) =>
        current.map((stop) =>
          stop.id === id
            ? { ...stop, suggestions: [], searching: false }
            : stop
        )
      );
      return;
    }

    const timeout = window.setTimeout(() => {
      void searchStopLocation(id, value);
    }, 300);
    stopSearchTimeoutRefs.current.set(id, timeout);
  }

  async function searchStopLocation(id: string, query: string) {
    stopSearchAbortRefs.current.get(id)?.abort();
    const controller = new AbortController();
    stopSearchAbortRefs.current.set(id, controller);

    const localResults = searchGhanaLandmarks(query.trim(), 6).map(
      mapLocalLandmark
    );

    setStops((current) =>
      current.map((stop) =>
        stop.id === id
          ? { ...stop, suggestions: localResults, searching: true }
          : stop
      )
    );

    try {
      const remoteResults = await searchGhanaLocations(
        query.trim(),
        controller.signal
      );
      if (controller.signal.aborted) return;

      setStops((current) =>
        current.map((stop) =>
          stop.id === id
            ? {
                ...stop,
                suggestions: dedupeSuggestions([
                  ...localResults,
                  ...remoteResults,
                ]),
              }
            : stop
        )
      );
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        setStops((current) =>
          current.map((stop) =>
            stop.id === id
              ? { ...stop, suggestions: localResults }
              : stop
          )
        );
      }
    } finally {
      if (!controller.signal.aborted) {
        setStops((current) =>
          current.map((stop) =>
            stop.id === id ? { ...stop, searching: false } : stop
          )
        );
      }
    }
  }

  function chooseStopSuggestion(id: string, suggestion: SearchSuggestion) {
    const place: SelectedPlace = {
      id: suggestion.id,
      name: suggestion.name,
      address: suggestion.address,
      latitude: suggestion.latitude,
      longitude: suggestion.longitude,
      source: suggestion.source,
    };

    setStops((current) =>
      current.map((stop) =>
        stop.id === id
          ? { ...stop, text: place.name, place, suggestions: [] }
          : stop
      )
    );
    placeStopMarker(id, place);
  }

  function placeStopMarker(id: string, place: SelectedPlace) {
    const map = mapRef.current;
    const browserWindow = window as GoogleMapsWindow;
    if (!map || !browserWindow.google?.maps) return;

    const marker = new browserWindow.google.maps.Marker({
      position: { lat: place.latitude, lng: place.longitude },
      map,
      title: place.name,
      icon: {
        path: browserWindow.google.maps.SymbolPath.CIRCLE,
        fillColor: "#f59e0b",
        fillOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 2,
        scale: 8,
      },
    });

    stopMarkerRefs.current.get(id)?.setMap(null);
    stopMarkerRefs.current.set(id, marker);
  }

  function placeMarker(
    place: SelectedPlace,
    field: "pickup" | "destination"
  ) {
    const map = mapRef.current;
    const browserWindow = window as GoogleMapsWindow;
    if (!map || !browserWindow.google?.maps) return;

    const marker = new browserWindow.google.maps.Marker({
      position: {
        lat: place.latitude,
        lng: place.longitude,
      },
      map,
      title: place.name,
      icon: {
        path: browserWindow.google.maps.SymbolPath.CIRCLE,
        fillColor:
          field === "pickup" ? "#16a34a" : "#7c3aed",
        fillOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 2,
        scale: 9,
      },
    });

    if (field === "pickup") {
      pickupMarkerRef.current?.setMap(null);
      pickupMarkerRef.current = marker;
    } else {
      destinationMarkerRef.current?.setMap(null);
      destinationMarkerRef.current = marker;
    }

    map.panTo({
      lat: place.latitude,
      lng: place.longitude,
    });
    map.setZoom(14);
  }

  async function useCurrentLocation() {
    if (!navigator.geolocation) {
      setMessage(
        "Your browser does not support location services."
      );
      return;
    }

    setMessage(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        let name = "Current location";
        let address = "Current location";

        if (GEOAPIFY_KEY) {
          try {
            const params = new URLSearchParams({
              lat: String(latitude),
              lon: String(longitude),
              format: "geojson",
              apiKey: GEOAPIFY_KEY,
            });

            const response = await fetch(
              `https://api.geoapify.com/v1/geocode/reverse?${params.toString()}`
            );

            if (response.ok) {
              const data = (await response.json()) as {
                features?: GeoapifyFeature[];
              };

              const feature =
                data.features?.[0];

              if (feature) {
                name =
                  feature.properties.name ||
                  feature.properties
                    .address_line1 ||
                  "Current location";

                address =
                  feature.properties.formatted ||
                  name;
              }
            }
          } catch {
            // GPS coordinates remain valid.
          }
        }

        const place: SelectedPlace = {
          id: `gps-${latitude}-${longitude}`,
          name,
          address,
          latitude,
          longitude,
          source: "GPS",
        };

        setPickup(place);
        setPickupText(name);
        setPickupSuggestions([]);
        placeMarker(place, "pickup");
      },
      () => {
        setMessage(
          "We could not access your current location. Check your browser location permission."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      }
    );
  }

  async function calculateRoute(
    from: SelectedPlace,
    to: SelectedPlace,
    intermediateStops: SelectedPlace[]
  ) {
    const browserWindow = window as GoogleMapsWindow;

    if (!GOOGLE_MAPS_WEB_KEY) {
      setRouteInfo(null);
      return;
    }

    if (!browserWindow.google?.maps) {
      try {
        await loadGoogleMaps();
      } catch {
        setRouteInfo(null);
        setMessage("Google Maps could not load.");
        return;
      }
    }

    routeAbortRef.current?.abort();

    const controller = new AbortController();
    routeAbortRef.current = controller;

    setRouteLoading(true);
    setRouteInfo(null);
    setPricing([]);

    try {
      const googleMaps = browserWindow.google.maps;
      const directionsService =
        new googleMaps.DirectionsService();

      const result = await new Promise<any>(
        (resolve, reject) => {
          directionsService.route(
            {
              origin: {
                lat: from.latitude,
                lng: from.longitude,
              },
              destination: {
                lat: to.latitude,
                lng: to.longitude,
              },
              waypoints: intermediateStops.map((stop) => ({
                location: {
                  lat: stop.latitude,
                  lng: stop.longitude,
                },
                stopover: true,
              })),
              optimizeWaypoints: false,
              travelMode: googleMaps.TravelMode.DRIVING,
              provideRouteAlternatives: false,
            },
            (routeResult: any, status: string) => {
              if (
                status === "OK" &&
                routeResult?.routes?.[0]
              ) {
                resolve(routeResult);
              } else {
                reject(
                  new Error("No Google driving route was found")
                );
              }
            }
          );
        }
      );

      if (controller.signal.aborted) return;

      const route = result.routes[0];
      const legs = route.legs || [];

      if (legs.length === 0) {
        throw new Error(
          "No driving route was found"
        );
      }

      const distanceKm =
        legs.reduce(
          (total: number, leg: any) =>
            total + Number(leg.distance?.value || 0),
          0
        ) / 1000;

      const durationMinutes =
        legs.reduce(
          (total: number, leg: any) =>
            total + Number(leg.duration?.value || 0),
          0
        ) / 60;

      setRouteInfo({
        distanceKm,
        durationMinutes,
      });

      drawRoute(route.overview_path || []);

      fitRouteBounds(from, to, route.bounds);
    } catch (error) {
      if (controller.signal.aborted) {
        return;
      }

      setRouteInfo(null);
      setPricing([]);
      setMessage(
        "We could not calculate this route. Please try another pickup or destination."
      );
    } finally {
      if (!controller.signal.aborted) {
        setRouteLoading(false);
      }
    }
  }

  async function loadPricing(
    route: RouteInfo
  ) {
    pricingAbortRef.current?.abort();

    if (!CRUUZ_API_URL) {
      setPricing([]);
      setPricingError(
        "CRUUZ API URL is not configured."
      );
      return;
    }

    const controller = new AbortController();
    pricingAbortRef.current = controller;

    setPricingLoading(true);
    setPricingError(null);

    try {
      const response = await fetch(
        `${CRUUZ_API_URL}/pricing/options`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            distanceKm: Number(
              route.distanceKm.toFixed(3)
            ),
            durationMinutes: Number(
              route.durationMinutes.toFixed(3)
            ),
          }),
          signal: controller.signal,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "CRUUZ pricing service returned an error."
        );
      }

      const rideOptions =
        Array.isArray(data.rideOptions)
          ? (data.rideOptions as PricingEstimate[])
          : [];

      setPricing(rideOptions);
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }

      setPricing([]);

      setPricingError(
        error instanceof Error
          ? error.message
          : "Unable to load CRUUZ fares."
      );
    } finally {
      if (!controller.signal.aborted) {
        setPricingLoading(false);
      }
    }
  }

  function drawRoute(path: any[]) {
    const map = mapRef.current;
    const browserWindow = window as GoogleMapsWindow;
    if (!map || !browserWindow.google?.maps) return;

    routePolylineRef.current?.setMap(null);
    routePolylineRef.current =
      new browserWindow.google.maps.Polyline({
        path,
        geodesic: true,
        strokeColor: "#7c3aed",
        strokeOpacity: 0.95,
        strokeWeight: 6,
        map,
      });
  }

  function clearRoute() {
    routePolylineRef.current?.setMap(null);
    routePolylineRef.current = null;
  }

  function fitRouteBounds(
    from: SelectedPlace,
    to: SelectedPlace,
    routeBounds?: any
  ) {
    const map = mapRef.current;
    const browserWindow = window as GoogleMapsWindow;
    if (!map || !browserWindow.google?.maps) return;

    if (routeBounds) {
      map.fitBounds(routeBounds, 80);
      return;
    }

    const bounds =
      new browserWindow.google.maps.LatLngBounds();

    bounds.extend({
      lat: from.latitude,
      lng: from.longitude,
    });

    bounds.extend({
      lat: to.latitude,
      lng: to.longitude,
    });

    map.fitBounds(bounds, 80);
  }

  async function apiRequest<T>(
    path: string,
    options: RequestInit = {},
    token?: string
  ): Promise<T> {
    if (!CRUUZ_API_URL) {
      throw new Error("The CRUUZ API URL is not configured.");
    }

    const response = await fetch(`${CRUUZ_API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || result?.success === false) {
      if (response.status === 401) {
        window.localStorage.removeItem(WEB_AUTH_TOKEN_KEY);
        window.localStorage.removeItem(WEB_VERIFIED_PHONE_KEY);
        setAccessToken("");
        setVerifiedPhone("");
      }

      throw new Error(
        result?.message || "CRUUZ could not complete this request."
      );
    }

    return result as T;
  }

  function isPhoneVerified() {
    return Boolean(
      accessToken &&
        verifiedPhone &&
        verifiedPhone.trim() === phone.trim()
    );
  }

  async function sendBookingOtp() {
    const cleanPhone = phone.trim();

    if (!/^\+?[0-9\s\-()]{10,18}$/.test(cleanPhone)) {
      setMessage(
        "Enter a valid phone number before requesting the verification code."
      );
      return;
    }

    setAuthBusy(true);
    setMessage(null);

    try {
      const result = await apiRequest<{ message?: string }>("/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ phone: cleanPhone }),
      });

      setOtpSent(true);
      setOtpCode("");
      setMessage(
        result.message ||
          "A six-digit verification code was sent to your phone."
      );
    } catch (error: any) {
      setMessage(error.message || "Could not send the verification code.");
    } finally {
      setAuthBusy(false);
    }
  }

  async function verifyBookingOtp() {
    if (!/^\d{6}$/.test(otpCode.trim())) {
      setMessage("Enter the six-digit verification code.");
      return;
    }

    setAuthBusy(true);
    setMessage(null);

    try {
      const result = await apiRequest<{
        accessToken?: string;
        token?: string;
        mfaRequired?: boolean;
        mfaEnrollmentRequired?: boolean;
      }>("/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({
          phone: phone.trim(),
          otp: otpCode.trim(),
        }),
      });

      if (result.mfaRequired || result.mfaEnrollmentRequired) {
        throw new Error(
          "This account requires additional security verification in the CRUUZ app."
        );
      }

      const token = result.accessToken || result.token || "";
      if (!token) {
        throw new Error("CRUUZ did not return a login token.");
      }

      setAccessToken(token);
      setVerifiedPhone(phone.trim());
      window.localStorage.setItem(WEB_AUTH_TOKEN_KEY, token);
      window.localStorage.setItem(
        WEB_VERIFIED_PHONE_KEY,
        phone.trim()
      );
      setMessage("Phone verified. You can now request your CRUUZ.");
    } catch (error: any) {
      setMessage(error.message || "Could not verify this code.");
    } finally {
      setAuthBusy(false);
    }
  }

  async function createTrip(paymentReference?: string) {
    if (!pickup || !destination || !routeInfo || !selectedPricingId) {
      throw new Error("Complete the route and ride selection first.");
    }

    const result = await apiRequest<{ trip: CreatedTrip }>(
      "/trips/request",
      {
        method: "POST",
        body: JSON.stringify({
          pickupAddress: pickup.address || pickup.name,
          pickupLat: pickup.latitude,
          pickupLng: pickup.longitude,
          dropoffAddress: destination.address || destination.name,
          dropoffLat: destination.latitude,
          dropoffLng: destination.longitude,
          stops: stops.map((stop) => ({
            stopAddress: stop.place?.address || stop.place?.name,
            stopLat: stop.place?.latitude,
            stopLng: stop.place?.longitude,
          })),
          rideTypeId: selectedPricingId,
          paymentMethod,
          paymentReference: paymentReference || undefined,
          distanceKm: routeInfo.distanceKm,
          durationMinutes: routeInfo.durationMinutes,
        }),
      },
      accessToken
    );

    if (!result.trip?.id) {
      throw new Error("CRUUZ returned no trip confirmation.");
    }

    setCreatedTrip(result.trip);
    setPendingPaymentReference("");
    window.localStorage.removeItem(WEB_PENDING_PAYMENT_KEY);
    setMessage(
      "Your CRUUZ has been requested. Keep your Pickup PIN private until the driver arrives."
    );
  }

  async function initializePaystackPayment() {
    if (!selectedFare) {
      throw new Error("A valid fare is required before payment.");
    }

    const paymentAmount = automaticBenefit?.valid
      ? automaticBenefit.finalFare
      : selectedFare.totalFare;

    const result = await apiRequest<{
      authorizationUrl?: string;
      checkoutUrl?: string;
      reference: string;
    }>(
      "/payment-gateway/initialize",
      {
        method: "POST",
        body: JSON.stringify({
          provider: "PAYSTACK",
          amount: Number(paymentAmount.toFixed(2)),
          currency: "GHS",
          purpose: "TRIP_PAYMENT",
          email: email.trim() || undefined,
          metadata: {
            source: "WEB_BOOKING",
            paymentMethod,
            tripPayment: true,
          },
        }),
      },
      accessToken
    );

    const checkoutUrl = result.authorizationUrl || result.checkoutUrl;
    if (!checkoutUrl || !result.reference) {
      throw new Error("Paystack did not return a checkout link.");
    }

    setPendingPaymentReference(result.reference);
    window.localStorage.setItem(
      WEB_PENDING_PAYMENT_KEY,
      result.reference
    );
    window.open(checkoutUrl, "_blank", "noopener,noreferrer");
    setMessage(
      "Paystack opened in a new tab. Complete the test payment, return here, then select Verify payment & request ride."
    );
  }

  async function verifyPendingPaymentAndCreateTrip() {
    if (!pendingPaymentReference) {
      throw new Error("There is no pending payment to verify.");
    }

    const result = await apiRequest<{
      transaction?: { status?: string };
    }>(
      "/payment-gateway/verify",
      {
        method: "POST",
        body: JSON.stringify({ reference: pendingPaymentReference }),
      },
      accessToken
    );

    if (result.transaction?.status !== "SUCCESS") {
      throw new Error("Paystack has not confirmed this payment yet.");
    }

    await createTrip(pendingPaymentReference);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setMessage(null);

    if (!pickup || !destination) {
      setMessage(
        "Select a valid pickup and destination."
      );
      return;
    }

    if (stops.some((stop) => !stop.place)) {
      setMessage("Select a valid location for every added stop.");
      return;
    }

    if (
      bookingMode === "SCHEDULED" &&
      (!scheduledDate || !scheduledTime)
    ) {
      setMessage(
        "Choose the date and time for your scheduled ride."
      );
      return;
    }

    if (bookingMode === "SCHEDULED") {
      setMessage(
        "Scheduled web booking is not active yet. Select Ride now to request a driver."
      );
      return;
    }

    if (!fullName.trim() || !phone.trim()) {
      setMessage(
        "Enter your name and phone number."
      );
      return;
    }

    if (
      rideType !== "BUSINESS" &&
      !selectedFare
    ) {
      setMessage(
        "Please wait for CRUUZ to calculate your fare."
      );
      return;
    }

    if (rideType === "BUSINESS") {
      setMessage(
        "Business booking will be completed through the CRUUZ Business Dashboard."
      );
      return;
    }

    if (!isPhoneVerified()) {
      await sendBookingOtp();
      return;
    }

    setBookingBusy(true);

    try {
      if (PREPAID_PAYMENT_METHODS.includes(paymentMethod)) {
        if (pendingPaymentReference) {
          await verifyPendingPaymentAndCreateTrip();
        } else {
          await initializePaystackPayment();
        }
      } else {
        await createTrip();
      }
    } catch (error: any) {
      setMessage(error.message || "CRUUZ could not request this ride.");
    } finally {
      setBookingBusy(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px]"
    >
      <div className="space-y-8">
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur sm:p-7">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-400">
              When do you want to move?
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              Book your CRUUZ
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ModeButton
              active={bookingMode === "NOW"}
              onClick={() =>
                setBookingMode("NOW")
              }
              icon={
                <Navigation className="h-5 w-5" />
              }
              title="Ride now"
              subtitle="Request your ride"
            />

            <ModeButton
              active={
                bookingMode === "SCHEDULED"
              }
              onClick={() =>
                setBookingMode("SCHEDULED")
              }
              icon={
                <CalendarDays className="h-5 w-5" />
              }
              title="Schedule"
              subtitle="Book ahead"
            />
          </div>

          {bookingMode === "SCHEDULED" && (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <TextInput
                label="Date"
                type="date"
                value={scheduledDate}
                onChange={setScheduledDate}
              />

              <TextInput
                label="Time"
                type="time"
                value={scheduledTime}
                onChange={setScheduledTime}
              />
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur sm:p-7">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-400">
                Your route
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                Where are you going?
              </h2>
            </div>

            <button
              type="button"
              onClick={useCurrentLocation}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <LocateFixed className="h-4 w-4" />
              My location
            </button>
          </div>

          <div className="space-y-4">
            <LocationInput
              label="Pickup"
              value={pickupText}
              onChange={(value) => {
                setPickupText(value);

                if (
                  pickup &&
                  normalizeKey(value) !==
                    normalizeKey(pickup.name)
                ) {
                  setPickup(null);
                  pickupMarkerRef.current?.setMap(null);
                  pickupMarkerRef.current = null;
                }
              }}
              suggestions={pickupSuggestions}
              searching={pickupSearching}
              onSelect={(suggestion) =>
                chooseSuggestion(
                  suggestion,
                  "pickup"
                )
              }
              markerClass="bg-emerald-500"
            />

            {stops.map((stop, index) => (
              <div key={stop.id} className="flex items-end gap-2">
                <div className="min-w-0 flex-1">
                  <LocationInput
                    label={`Stop ${index + 1}`}
                    value={stop.text}
                    onChange={(value) => updateStopText(stop.id, value)}
                    suggestions={stop.suggestions}
                    searching={stop.searching}
                    onSelect={(suggestion) =>
                      chooseStopSuggestion(stop.id, suggestion)
                    }
                    markerClass="bg-amber-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeStop(stop.id)}
                  aria-label={`Remove stop ${index + 1}`}
                  className="mb-0.5 inline-flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10 text-red-200 transition hover:bg-red-500/20"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}

            {stops.length < MAX_INTERMEDIATE_STOPS && (
              <button
                type="button"
                onClick={addStop}
                className="inline-flex items-center gap-2 text-sm font-bold text-violet-300 transition hover:text-violet-200"
              >
                <Plus className="h-4 w-4" />
                Add stop
                <span className="font-medium text-white/35">
                  ({stops.length}/{MAX_INTERMEDIATE_STOPS})
                </span>
              </button>
            )}

            <LocationInput
              label="Destination"
              value={destinationText}
              onChange={(value) => {
                setDestinationText(value);

                if (
                  destination &&
                  normalizeKey(value) !==
                    normalizeKey(
                      destination.name
                    )
                ) {
                  setDestination(null);
                  destinationMarkerRef.current?.setMap(null);
                  destinationMarkerRef.current =
                    null;
                }
              }}
              suggestions={
                destinationSuggestions
              }
              searching={destinationSearching}
              onSelect={(suggestion) =>
                chooseSuggestion(
                  suggestion,
                  "destination"
                )
              }
              markerClass="bg-violet-500"
            />
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-black">
            <div
              ref={mapContainerRef}
              className="h-[360px] w-full sm:h-[430px]"
            />
          </div>

          {routeLoading && (
            <div className="mt-4 rounded-2xl border border-violet-500/20 bg-violet-500/10 px-4 py-3 text-sm text-violet-100">
              Calculating your CRUUZ route...
            </div>
          )}

          {routeInfo && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Route className="h-4 w-4" />
                  Distance
                </div>

                <p className="mt-2 text-xl font-bold text-white">
                  {routeInfo.distanceKm.toFixed(
                    1
                  )}{" "}
                  km
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Timer className="h-4 w-4" />
                  Estimated trip
                </div>

                <p className="mt-2 text-xl font-bold text-white">
                  {Math.round(
                    routeInfo.durationMinutes
                  )}{" "}
                  min
                </p>
              </div>
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur sm:p-7">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-400">
                Choose your service
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                Ride your way
              </h2>
            </div>

            {pricingLoading && (
              <span className="rounded-full bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-300">
                Calculating CRUUZ fares...
              </span>
            )}
          </div>

          {pricingError && (
            <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
              <p className="font-semibold">
                Fare service unavailable
              </p>

              <p className="mt-1">
                {pricingError}
              </p>

              <p className="mt-2 text-red-100/70">
                Make sure the CRUUZ API is
                running on {CRUUZ_API_URL || "the configured API URL"}.
              </p>
            </div>
          )}

          <div className="grid gap-3 md:grid-cols-2">
            {rideTypes.map((item) => {
              const pricingId =
                PRICING_TYPE_MAP[item.id];

              const fare = pricingId
                ? pricing.find(
                    (estimate) =>
                      estimate.rideTypeId ===
                      pricingId
                  )
                : null;

              const active =
                rideType === item.id;

              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() =>
                    setRideType(item.id)
                  }
                  className={[
                    "rounded-2xl border p-4 text-left transition",
                    active
                      ? "border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-950/20"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 gap-3">
                      <div
                        className={[
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
                          active
                            ? "bg-violet-500 text-white"
                            : "bg-white/10 text-white",
                        ].join(" ")}
                      >
                        {item.icon}
                      </div>

                      <div className="min-w-0">
                        <p className="font-bold text-white">
                          {item.name}
                        </p>

                        <p className="mt-1 text-sm leading-5 text-white/55">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      {item.id ===
                      "BUSINESS" ? (
                        <span className="text-sm font-bold text-violet-300">
                          Corporate
                        </span>
                      ) : pricingLoading ? (
                        <span className="text-xs text-white/50">
                          ...
                        </span>
                      ) : fare ? (
                        <>
                          <p className="font-extrabold text-white">
                            GH₵
                            {fare.totalFare.toFixed(
                              2
                            )}
                          </p>

                          <p className="mt-1 text-xs text-white/45">
                            estimate
                          </p>
                        </>
                      ) : (
                        <span className="text-xs text-white/40">
                          Select route
                        </span>
                      )}

                      {active && (
                        <div className="mt-2 flex justify-end">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-white">
                            <Check className="h-3 w-3" />
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

         {selectedFare && (
  <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-emerald-300">
          CRUUZ live estimated fare
        </p>

        <p className="mt-1 text-xs text-white/50">
          Calculated by the CRUUZ Pricing API
          from your route distance and estimated
          journey time.
        </p>
      </div>

      <div className="shrink-0 text-right">
        {automaticBenefit?.valid ? (
          <>
            <p className="text-xs text-white/45">
              Final estimate
            </p>

            <p className="text-2xl font-black text-white">
              GH₵
              {automaticBenefit.finalFare.toFixed(2)}
            </p>
          </>
        ) : (
          <p className="text-2xl font-black text-white">
            GH₵
            {selectedFare.totalFare.toFixed(2)}
          </p>
        )}
      </div>
    </div>

    {automaticBenefitLoading && (
      <div className="mt-4 rounded-xl border border-white/10 bg-black/10 px-3 py-2 text-xs text-white/60">
        Checking available rider benefits...
      </div>
    )}

    {automaticBenefit?.valid && (
      <div className="mt-4 rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-violet-200">
              {automaticBenefit.campaignName ||
                "First Rider Benefit"}
            </p>

            <p className="mt-1 text-xs text-white/50">
              Applied automatically by CRUUZ.
            </p>
          </div>

          <span className="rounded-full bg-emerald-500/15 px-3 py-1.5 text-sm font-bold text-emerald-300">
            -GH₵
            {automaticBenefit.discountAmount.toFixed(2)}
          </span>
        </div>

        <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm">
          <div className="flex justify-between gap-4 text-white/60">
            <span>Standard fare</span>
            <span>
              GH₵
              {automaticBenefit.originalFare.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between gap-4 text-emerald-300">
            <span>Benefit discount</span>
            <span>
              -GH₵
              {automaticBenefit.discountAmount.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between gap-4 border-t border-white/10 pt-2 font-bold text-white">
            <span>Estimated fare</span>
            <span>
              GH₵
              {automaticBenefit.finalFare.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    )}

    {!automaticBenefit &&
      !automaticBenefitLoading &&
      selectedPricingId !== "DELIVERY" && (
        <p className="mt-4 text-xs text-white/45">
          Eligible new riders can receive the
          CRUUZ First Rider Benefit automatically
          after signing in.
        </p>
      )}

    <div className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
      <FarePart
        label="Base"
        value={selectedFare.baseFare}
      />

      <FarePart
        label="Distance"
        value={selectedFare.distanceFare}
      />

      <FarePart
        label="Time"
        value={selectedFare.timeFare}
      />
    </div>
  </div>
)}
        </section>

        {rideType === "DELIVERY" && (
          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">
            <h2 className="text-xl font-bold text-white">
              Delivery details
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <TextInput
                label="Recipient name"
                value={deliveryRecipient}
                onChange={
                  setDeliveryRecipient
                }
                placeholder="Recipient"
              />

              <TextInput
                label="Recipient phone"
                value={deliveryPhone}
                onChange={setDeliveryPhone}
                placeholder="+233..."
              />
            </div>
          </section>
        )}

        {rideType === "ACCESS" && (
          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">
            <h2 className="text-xl font-bold text-white">
              Accessibility request
            </h2>

            <textarea
              value={accessNotes}
              onChange={(event) =>
                setAccessNotes(
                  event.target.value
                )
              }
              placeholder="Tell us about any accessibility or mobility support you may need."
              className="mt-5 min-h-28 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-violet-500"
            />
          </section>
        )}

        {rideType === "HOURLY" && (
          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">
            <h2 className="text-xl font-bold text-white">
              Hourly booking
            </h2>

            <div className="mt-5 max-w-xs">
              <TextInput
                label="Number of hours"
                type="number"
                value={hourlyHours}
                onChange={setHourlyHours}
              />
            </div>
          </section>
        )}

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur sm:p-7">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-400">
              Rider details
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              How can we reach you?
            </h2>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <TextInput
              label="Full name"
              value={fullName}
              onChange={setFullName}
              placeholder="Your full name"
            />

            <TextInput
              label="Phone number"
              value={phone}
              onChange={setPhone}
              placeholder="+233..."
            />

            <div className="sm:col-span-2">
              <TextInput
                label="Email address"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="Optional"
              />
            </div>
          </div>

          {otpSent && !isPhoneVerified() && (
            <div className="mt-5 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-4">
              <p className="font-semibold text-white">
                Verify your phone
              </p>

              <p className="mt-1 text-xs leading-5 text-white/55">
                Enter the six-digit code sent to {phone.trim()}.
              </p>

              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  value={otpCode}
                  onChange={(event) =>
                    setOtpCode(
                      event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6)
                    )
                  }
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="6-digit code"
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-violet-500"
                />

                <button
                  type="button"
                  onClick={() => void verifyBookingOtp()}
                  disabled={authBusy || otpCode.length !== 6}
                  className="rounded-xl bg-violet-600 px-5 py-3 font-bold text-white disabled:opacity-50"
                >
                  {authBusy ? "Verifying..." : "Verify phone"}
                </button>
              </div>

              <button
                type="button"
                onClick={() => void sendBookingOtp()}
                disabled={authBusy}
                className="mt-3 text-xs font-semibold text-violet-300 disabled:opacity-50"
              >
                Send a new code
              </button>
            </div>
          )}

          {isPhoneVerified() && (
            <div className="mt-5 flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-semibold text-emerald-300">
              <Check className="h-4 w-4" />
              Phone verified
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur sm:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-400">
            Payment
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            How would you like to pay?
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {PAYMENT_METHODS.map((method) => {
              const prepaid =
                PREPAID_PAYMENT_METHODS.includes(method.id);
              const active = paymentMethod === method.id;

              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => {
                    setPaymentMethod(method.id);
                    setPendingPaymentReference("");
                    window.localStorage.removeItem(
                      WEB_PENDING_PAYMENT_KEY
                    );
                  }}
                  className={[
                    "rounded-2xl border p-4 text-left transition",
                    active
                      ? "border-violet-500 bg-violet-500/10"
                      : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-white">
                        {method.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-white/50">
                        {method.subtitle}
                      </p>
                    </div>

                    {active && (
                      <Check className="h-5 w-5 shrink-0 text-violet-400" />
                    )}
                  </div>

                  {prepaid && !PAYSTACK_LIVE_ENABLED && (
                    <span className="mt-3 inline-flex rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-300">
                      Paystack test mode
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <aside className="xl:sticky xl:top-28 xl:self-start">
        <div className="rounded-3xl border border-white/10 bg-[#121218] p-6 shadow-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-400">
            Booking summary
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Your CRUUZ
          </h2>

          <div className="mt-6 space-y-4">
            <Summary
              label="Pickup"
              value={
                pickup?.name ||
                "Choose pickup"
              }
            />

            {stops.map((stop, index) => (
              <Summary
                key={stop.id}
                label={`Stop ${index + 1}`}
                value={stop.place?.name || "Choose stop"}
              />
            ))}

            <Summary
              label="Destination"
              value={
                destination?.name ||
                "Choose destination"
              }
            />

            <Summary
              label="When"
              value={
                bookingMode === "NOW"
                  ? "Ride now"
                  : scheduledDate &&
                      scheduledTime
                    ? `${scheduledDate} at ${scheduledTime}`
                    : "Scheduled ride"
              }
            />

            <Summary
              label="Service"
              value={
                rideTypes.find(
                  (item) =>
                    item.id === rideType
                )?.name || rideType
              }
            />

            {routeInfo && (
              <>
                <Summary
                  label="Distance"
                  value={`${routeInfo.distanceKm.toFixed(
                    1
                  )} km`}
                />

                <Summary
                  label="Estimated trip"
                  value={`${Math.round(
                    routeInfo.durationMinutes
                  )} min`}
                />
              </>
            )}
          </div>

          <div className="my-6 h-px bg-white/10" />

          {rideType === "BUSINESS" ? (
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">
                Business account booking
              </p>

              <p className="mt-1 text-xs leading-5 text-white/50">
                Business is an account type, not
                one of the current CRUUZ vehicle
                pricing classes. Corporate vehicle
                selection will use the existing
                CRUUZ ride classes.
              </p>
            </div>
          ) : selectedFare ? (
            <div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-white/50">
                    Estimated fare
                  </p>

                  <p className="mt-1 text-xs text-white/40">
                    CRUUZ Pricing Engine
                  </p>
                </div>

                <p className="text-3xl font-black text-white">
                  GH₵
                  {selectedFare.totalFare.toFixed(
                    2
                  )}
                </p>
              </div>

              <div className="mt-4 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-3 text-xs leading-5 text-violet-100">
                Promotions and the 10% First Rider
                Benefit will be applied by the
                CRUUZ Campaign Engine when rider
                account eligibility is connected.
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-white/5 p-4 text-sm text-white/50">
              {pricingLoading
                ? "CRUUZ is calculating your fare..."
                : "Choose your pickup and destination to see the estimated fare."}
            </div>
          )}

          <button
            type="submit"
            disabled={
              bookingBusy ||
              authBusy ||
              Boolean(createdTrip) ||
              rideType !== "BUSINESS" &&
              (!selectedFare ||
                pricingLoading ||
                routeLoading)
            }
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-4 font-bold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {bookingBusy
              ? "Please wait..."
              : createdTrip
                ? "Ride requested"
                : !isPhoneVerified()
                  ? "Verify phone to continue"
                  : PREPAID_PAYMENT_METHODS.includes(
                        paymentMethod
                      )
                    ? pendingPaymentReference
                      ? "Verify payment & request ride"
                      : `Continue to Paystack${PAYSTACK_LIVE_ENABLED ? "" : " test"}`
                    : "Request CRUUZ"}
            <ArrowRight className="h-5 w-5" />
          </button>

          <div className="mt-5 space-y-3 border-t border-white/10 pt-5 text-xs leading-5 text-white/45">
            <p className="flex gap-2">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              Fare calculations come from the
              existing CRUUZ backend pricing
              service.
            </p>

            <p className="flex gap-2">
              <CreditCard className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
              Cash is paid to the driver. Electronic
              payments are securely processed by
              Paystack.
            </p>

            <p>
              Ghana place search uses CRUUZ Places.
              Google Maps provides the map, driving
              route, distance and estimated travel
              time.
            </p>
          </div>

          {createdTrip && (
            <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
                Booking confirmed
              </p>

              <p className="mt-2 break-all text-sm text-white/60">
                Trip {createdTrip.id}
              </p>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                Pickup PIN
              </p>

              <p className="mt-2 text-4xl font-black tracking-[0.3em] text-white">
                {createdTrip.tripVerificationCode || "----"}
              </p>

              <p className="mt-3 text-xs leading-5 text-white/55">
                Give this four-digit PIN only to your
                assigned driver when the vehicle
                arrives.
              </p>
            </div>
          )}

          {message && (
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/75">
              {message}
            </div>
          )}
        </div>
      </aside>
    </form>
  );
}

function LocationInput({
  label,
  value,
  onChange,
  suggestions,
  searching,
  onSelect,
  markerClass,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suggestions: SearchSuggestion[];
  searching: boolean;
  onSelect: (
    suggestion: SearchSuggestion
  ) => void;
  markerClass: string;
}) {
  return (
    <div className="relative">
      <label className="mb-2 block text-sm font-semibold text-white/70">
        {label}
      </label>

      <div className="relative">
        <span
          className={`absolute left-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full ${markerClass}`}
        />

        <input
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={`Search ${label.toLowerCase()}`}
          autoComplete="off"
          className="w-full rounded-2xl border border-white/10 bg-black/20 py-3.5 pl-10 pr-11 text-white outline-none placeholder:text-white/30 focus:border-violet-500"
        />

        <Search className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
      </div>

      {(suggestions.length > 0 ||
        searching) && (
        <div className="absolute z-30 mt-2 max-h-80 w-full overflow-y-auto rounded-2xl border border-white/10 bg-[#17171d] p-2 shadow-2xl">
          {suggestions.map(
            (suggestion) => (
              <button
                key={suggestion.id}
                type="button"
                onClick={() =>
                  onSelect(suggestion)
                }
                className="flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-white/5"
              >
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-violet-400" />

                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-white">
                    {suggestion.name}
                  </p>

                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/45">
                    {suggestion.address}
                  </p>
                </div>

                <span
                  className={[
                    "shrink-0 rounded-full px-2 py-1 text-[10px] font-bold",
                    suggestion.source ===
                    "CRUUZ"
                      ? "bg-emerald-500/10 text-emerald-300"
                      : "bg-violet-500/10 text-violet-300",
                  ].join(" ")}
                >
                  {suggestion.source}
                </span>
              </button>
            )
          )}

          {searching && (
            <div className="px-3 py-2 text-xs text-white/40">
              Searching Ghana...
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ModeButton({
  active,
  onClick,
  icon,
  title,
  subtitle,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-2xl border p-4 text-left transition",
        active
          ? "border-violet-500 bg-violet-500/10"
          : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <div
          className={[
            "flex h-10 w-10 items-center justify-center rounded-xl",
            active
              ? "bg-violet-500 text-white"
              : "bg-white/10 text-white",
          ].join(" ")}
        >
          {icon}
        </div>

        <div>
          <p className="font-bold text-white">
            {title}
          </p>

          <p className="mt-0.5 text-xs text-white/45">
            {subtitle}
          </p>
        </div>
      </div>
    </button>
  );
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-white/70">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none placeholder:text-white/30 focus:border-violet-500"
      />
    </label>
  );
}

function Summary({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm text-white/45">
        {label}
      </span>

      <span className="max-w-[220px] text-right text-sm font-semibold text-white">
        {value}
      </span>
    </div>
  );
}

function FarePart({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl bg-black/15 px-3 py-2">
      <p className="text-xs text-white/45">
        {label}
      </p>

      <p className="mt-1 font-bold text-white">
        GH₵{value.toFixed(2)}
      </p>
    </div>
  );
}

function mapLocalLandmark(
  landmark: GhanaLandmark
): SearchSuggestion {
  return {
    id: landmark.id,
    name: landmark.name,
    address: landmark.address,
    category: landmark.category,
    latitude: landmark.latitude,
    longitude: landmark.longitude,
    source: "CRUUZ",
  };
}

function dedupeSuggestions(
  items: SearchSuggestion[]
) {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = `${normalizeKey(
      item.name
    )}|${item.latitude.toFixed(
      4
    )}|${item.longitude.toFixed(4)}`;

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}

function normalizeKey(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}
