import React from "react";
import ButtonLink from "../../components/Button/ButtonLink";

type BannerType = {
  text: string;
  btnText: string;
  address: string;
  image: string;
};

export default function Banner({ text, btnText, address, image }: BannerType) {
  return (
    <React.Fragment>
      <div className="z-20 flex items-center justify-end relative h-full text-white container mx-auto">
        <div className="max-w-sm flex flex-col justify-items items-center">
          <p className="leading-normal text-center mb-3">{text}</p>
          <div className="w-3/4">
            <ButtonLink text={btnText} address={address} />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 h-auto z-10">
        <img
          src={process.env.PUBLIC_URL + `/images/${image}`}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
    </React.Fragment>
  );
}
