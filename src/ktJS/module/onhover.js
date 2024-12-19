import TU from '../threeUtils'
import { CACHE } from "../CACHE.js";
import { API } from "../API.js";
import { STATE } from "../STATE.js";
import { GUI } from "../GUI.js";

export default function onhover(evt) {
  const { objects } = evt
  if (objects.length > 0) {
    const { object } = objects[0]
    if (object.visible) {
      document.body.style.cursor = 'pointer'
    }
  }
}
