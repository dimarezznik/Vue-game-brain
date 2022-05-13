import { createStore } from "vuex";
import { main } from "@/store/main";
export default createStore({
  modules: {
    main,
  },
});