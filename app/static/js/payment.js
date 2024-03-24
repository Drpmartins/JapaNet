document.addEventListener("DOMContentLoaded", function() {
  const paymentForm = document.getElementById('paymentForm');
  const payButton = document.getElementById('payButton');
  const checkoutButton = document.getElementById('checkoutButton');

  // Disable the checkout button initially
  checkoutButton.disabled = true;
  checkoutButton.classList.add('disabled');

  paymentForm.addEventListener("submit", function(e) {
    e.preventDefault();
    // Trigger Paystack payment popup
    payWithPaystack();
  });

  function payWithPaystack() {
    let handler = PaystackPop.setup({
      key: '{YOUR_PUBLIC/LIVE_API_KEY}', // Replace with your public key/live key from paystack
      email: document.getElementById("email-address").value,
      amount: document.getElementById("amount").value * 100,
      currency: 'GHS', // Supported CURRENCIES GHS, NGN
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      // label: "Optional string that replaces customer email"
      onClose: function(){
        alert('Window closed.');
      },
      callback: function(response){
        let message = 'Payment complete! Reference: ' + response.reference;
        alert(message);
        // Enable the checkout button after successful payment
        checkoutButton.disabled = false;
        checkoutButton.classList.remove('disabled');
      }
    });

    handler.openIframe();
  }
});
