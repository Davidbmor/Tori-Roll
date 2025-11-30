import { socket } from "../../lib/socket";
import { carritoGlobal } from "../../lib/cart";

export default function AddToCartIsland({ producto }) {
  function add() {
    carritoGlobal.agregarProducto(producto);
    window.dispatchEvent(new CustomEvent("cart-updated"));
  }

  return (
    <a onClick={add} class="order">
      <i class="fa-solid fa-plus"></i> Pedir
    </a>
  );
}
