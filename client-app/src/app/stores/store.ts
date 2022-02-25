import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import TravelStore from "./travelStore";
import PhotoStore from "./photoStore";
import UserStore from "./userStore";

interface Store {
    activityStore : ActivityStore;
    travelStore : TravelStore;
    photoStore : PhotoStore;
    commonStore: CommonStore;
    userStore : UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    travelStore: new TravelStore (),
    photoStore: new PhotoStore (),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore : new ModalStore()
}

export const StoreContext = createContext (store);

export function useStore () {
    return useContext(StoreContext);
}