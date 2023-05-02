// store.js
export const store = {
  state: {
    username: "",
    userId: "",
  },
  setState(newState) {
    Object.assign(this.state, newState);
    this.notifyStateChanged();
  },
  notifyStateChanged() {
    const event = new CustomEvent("store-state-changed", {
      bubbles: true,
      composed: true,
    });
    window.dispatchEvent(event);
  },
};
