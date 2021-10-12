// Optional if using our sandbox
Paddle.Environment.set('sandbox');
// Set up Paddle
Paddle.Setup({ 
    // Swap this placeholder for your vendor ID in the Paddle dashboard
    vendor: 12345,
    eventCallback: function(data) {
        // The data.event will specify the event type
        if (data.event === "Checkout.Loaded" || data.event === "Checkout.Coupon.Applied") {
          const d = data.eventData;
          console.log(d); // Data specifics on the event
          inlinePurchaseTotal.textContent = `${d.checkout.prices.customer.total} ${d.checkout.prices.customer.currency}`;
        }
      }
});

const inlinePurchaseTotal = document.getElementById("purchaseTotal");

// Open the checkout initially
Paddle.Checkout.open({
    method: 'inline',
    product: 12345,    // Replace with your Product or Plan ID
    allowQuantity: false,
    disableLogout: true,
    passthrough: '{"user_id": 98765, "affiliation": "Acme Corp"}',
    frameTarget: 'checkout-container', // The className of your checkout <div>
    frameInitialHeight: 416,
    frameStyle: 'width:100%; min-width:312px; background-color: transparent; border: none;'    // Please ensure the minimum width is kept at or above 286px with checkout padding disabled, or 312px with checkout padding enabled. See "General" section under "Branded Inline Checkout" below for more information on checkout padding.
});

const reload = document.getElementById("submitUserInfo");
reload.addEventListener("click", () => reloadInlineCheckout());

function reloadInlineCheckout() {
    const form = document.getElementById("pre-checkout");
    console.log(form.useremail.value);
    Paddle.Checkout.open({
        method: 'inline',
        product: 12345,    // Replace with your Product or Plan ID
        email: form.useremail.value, // add in the user email passed from the form
        allowQuantity: false,
        disableLogout: true,
        frameTarget: 'checkout-container', // The className of your checkout <div>
        frameInitialHeight: 416,
        frameStyle: 'width:100%; min-width:312px; background-color: transparent; border: none;'  // Please ensure the minimum width is kept at or above 286px with checkout padding disabled, or 312px with checkout padding enabled. See "General" section under "Branded Inline Checkout" below for more information on checkout padding.
    });
}

