"use client";

import { removeRadio } from "@/actions/radios";
import { revalidatePath } from "next/cache";

export default function RemoveRadioButton(props: { url: string }) {
  return (
    <button
      onClick={async () => {
        removeRadio(props.url);
      }}
      type="button"
      id="remove"
      className={`w-0 opacity-0 ml-0 peer-focus:ml-1 peer-focus:opacity-100 bg-blur-4 peer-focus:delay-100 delay-1000 peer-focus:w-10 shrink-0 overflow-clip h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-transparent ease-in-out hover:border-white/20 rounded-xl duration-300`}
      title="Remove radio."
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5"
        viewBox="0 0 512 512"
      >
        <path
          d="M128 405.429C128 428.846 147.198 448 170.667 448h170.667C364.802 448 384 428.846 384 405.429V160H128v245.429zM416 96h-80l-26.785-32H202.786L176 96H96v32h320V96z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}
