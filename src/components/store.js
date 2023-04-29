import { LitState, stateVar } from "lit-element-state";
import { observeState } from "lit-element-state";
class Store extends LitState {
  @stateVar() products = [];
  observeState(store);
}


export const store = new Store();
