export default class StateStore {
  static stateSave(state) {
    window.localStorage.tmSaveData = JSON.stringify(state);
  }

  static stateLoad() {
    const state = window.localStorage.tmSaveData;
    if (state) {
      return JSON.parse(state);
    }
    return undefined;
  }
}
