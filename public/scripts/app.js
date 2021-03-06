$(() => {

  $("button.add-to-cart").click((e) => {
    const added = $(".add-confirmation")
    const cart = JSON.parse(localStorage.getItem("cart")) || {}
    const item = $(e.target)
    const itemId = item.data("item-id")
    const sideQ = $('#side-quantity')


  if (cart[itemId]) {
      // added.text('Good choice!').css("display", "inline-block").fadeOut(1200)
      cart[itemId].quantity += 1
      item.html(cart[itemId].quantity)
      console.log()
    } else {
      cart[itemId] = {
        quantity: 1,
        itemName: item.data("item-name"),
        price: item.data("item-price")
      }
    }

    window.localStorage.setItem("cart", JSON.stringify(cart))
  })

  $("button.remove-from-cart").click((e) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {}
    const added = $(".add-confirmation")
    const removeFromCart = $(e.target)
    const itemId = removeFromCart.data("item-id")
    const addButton = removeFromCart.siblings('.add-to-cart')


    if (cart[itemId].quantity === 1){
      delete cart[itemId]
    } else if (cart[itemId]) {
      // added.text('Awww...').css("display", "inline-block").fadeOut(1200)
      console.log(addButton)
      cart[itemId].quantity -= 1

      addButton.html(cart[itemId].quantity)
    } else {
      cart[itemId] = {
        quantity: 1,
        itemName: removeFromCart.data("item-name"),
        price: removeFromCart.data("item-price")
      }
    }

    window.localStorage.setItem("cart", JSON.stringify(cart))
  })


  $(".clear-cart").click((e) => {
    window.localStorage.removeItem("cart")
  })

  const cart = JSON.parse(localStorage.getItem("cart")) || {}

  let final_price = 0

  for (lineItem in cart) {
    let line_item_price = parseInt(cart[lineItem].price)*parseInt(cart[lineItem].quantity)
    $("table.cart").append(`
      <tr>
        <td>${cart[lineItem].itemName}</td>
        <td id=${lineItem}>${cart[lineItem].quantity}</td>
        <td>$ ${line_item_price}.00</td>
      </tr>
    `)
    final_price += line_item_price
  }

   $("table.cart").append(`
      <tr>
        <td></td>
        <td><strong>TOTAL</strong></td>
        <td>$ ${final_price}.00</td>
      </tr>
    `)

});
