import { create } from "zustand";

interface IBackground {
  gif?: string;
  savePower: boolean;
  state: boolean;
}
interface IBackgroundActions extends IBackground {
  setGift: (gif: string) => void;
  toggle: () => void;
  togglePowerMode: () => void;
  set: (prop: IBackground) => void;
}

const useBackground = create<IBackgroundActions>((set) => ({
  state: false,
  savePower: true,
  toggle: () => set((state) => ({ state: !state.state })),
  setGift: (gif: string) => set({ gif }),
  togglePowerMode: () => {
    //only client side
    if (typeof window === "undefined") return;
    set((state) => {
      localStorage.setItem(
        "backgroundPowerMode",
        (!state.savePower).toString(),
      );
      return { savePower: !state.savePower };
    });
    localStorage.setItem(
      "backgroundPowerMode",
      useBackground.getState().savePower.toString(),
    );
  },
  set: (prop: IBackground) => {
    set(prop);
  },
}));

export default useBackground;
