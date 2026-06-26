import Image from "next/image";
import Card from "./Card";

type Props = {
  image: string;
  title: string;
  description: string;
};

export default function FeatureCard({
  image,
  title,
  description,
}: Props) {
  return (
    <Card>
      <div className="p-8 text-center">
        <Image
          src={image}
          alt={title}
          width={110}
          height={110}
          className="mx-auto"
        />

        <h3 className="mt-6 text-xl font-black">
          {title}
        </h3>

        <p className="mt-3 leading-7 text-white/65">
          {description}
        </p>
      </div>
    </Card>
  );
}