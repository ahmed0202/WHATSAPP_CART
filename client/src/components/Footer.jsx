import React from "react";

const Footer = () => {
  return (
    <div className="mt-30 mb-10 px-4 pt-4 pb-2 sm:px-16 sm:pt-8 sm:pb-4 grid grid-cols-9 sm:grid-cols-12">
      <div className="col-span-3 sm:col-span-2">
        <h1 className="text-2xl font-semibold ">HELP</h1>
        <div className="mt-1 block">
          <h6 className="text-gray-700">Contact us</h6>
          <h6 className="text-gray-700">Returns and Changes</h6>
          <h6 className="text-gray-700">Shipping & Delivery</h6>
          <h6 className="text-gray-700">Order Tracking</h6>
          <h6 className="text-gray-700">FAQ</h6>
        </div>
      </div>
      <div className="col-span-3 sm:col-span-2 ">
        <h1 className="text-2xl font-semibold ">ABOUT US</h1>
        <div className="mt-1 block">
          <h6 className="text-gray-700">About us</h6>
          <h6 className="text-gray-700">Our Stores</h6>
          <h6 className="text-gray-700">Corporate</h6>
          <h6 className="text-gray-700">Career Opportunities</h6>
          <h6 className="text-gray-700">Corporate Support</h6>
        </div>
      </div>
      <div className="col-span-3 sm:col-span-2  ">
        <h1 className="text-2xl font-semibold ">POLICIES</h1>
        <div className="mt-1 block">
          <h6 className="text-gray-700">Data Privacy And Security Policy</h6>
          <h6 className="text-gray-700">Terms Of use</h6>
        </div>
      </div>
      <div className="mt-10 col-span-12 sm:mt-0 sm:col-span-6 flex justify-end">
        <svg
          width="386"
          height="128"
          viewBox="0 0 386 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_16_245)">
            <path
              d="M106.552 0V128L68.8822 105.399L32.2885 83.4532L0 64.0811V64L32.2885 44.6064L32.4499 44.509L68.8822 64.5625V22.6277L106.552 0Z"
              fill="#141821"
            />
            <path
              d="M174.909 0C139.377 0 110.573 28.6535 110.573 64C110.573 73.3463 112.584 82.2288 116.206 90.2322C126.279 112.495 148.772 128 174.909 128C210.436 128 239.24 99.3465 239.24 64C239.24 28.6535 210.436 0 174.909 0ZM173.939 89.6172C159.718 89.6172 148.187 78.1461 148.187 64C148.187 49.8539 159.718 38.3828 173.939 38.3828C188.159 38.3828 199.691 49.8485 199.691 64C199.691 78.1515 188.159 89.6172 173.939 89.6172Z"
              fill="#18C59F"
            />
            <path d="M281.458 0H243.26V128H281.458V0Z" fill="#18C59F" />
            <path
              d="M386 65.0247L352.239 86.2142L319.521 106.751L285.663 128H285.479V86.1765L319.521 65.8661L320.207 65.4615L319.521 65.0194L285.479 42.9616V0H285.631L319.521 21.9554L354.811 44.8167L386 65.0247Z"
              fill="#141821"
            />
          </g>
          <defs>
            <clipPath id="clip0_16_245">
              <rect width="386" height="128" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Footer;
