const addItemBtn = document.getElementById('add-item-btn');
const invoiceForm = document.getElementById('invoice-form');
const itemsContainer = document.getElementById('items-container');
const invoiceOutput = document.getElementById('invoice-output');
const printBtn = document.getElementById('print-btn');
const downloadBtn = document.getElementById('download-btn');
const mobileNumberInput = document.getElementById('mobile-number');
const addressInput = document.getElementById('address');
const taxRateInput = document.getElementById('tax-rate');
const discountInput = document.getElementById('discount');

function generateInvoiceNumber() {
  return 'INV-' + Math.floor(Math.random() * 1000000);
}

addItemBtn.addEventListener('click', function () {
  const itemRow = document.createElement('div');
  itemRow.classList.add('item-row');
  
  itemRow.innerHTML = `
    <input type="text" placeholder="Item Name" class="item-name" required>
    <input type="number" placeholder="Price" class="item-price" required>
    <input type="number" placeholder="Quantity" class="item-quantity" required>
    <button type="button" class="remove-item">Remove</button>
  `;
  
  itemsContainer.appendChild(itemRow);
  
  itemRow.querySelector('.remove-item').addEventListener('click', function () {
    itemRow.remove();
  });
});


invoiceForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const customerName = document.getElementById('customer-name').value;
  const invoiceDate = document.getElementById('invoice-date').value;
  const mobileNumber = mobileNumberInput.value;
  const address = addressInput.value;
  const taxRate = parseFloat(taxRateInput.value) / 100;
  const discount = parseFloat(discountInput.value) || 0;
  const invoiceNumber = generateInvoiceNumber();
  
  const items = [];
  const itemRows = document.querySelectorAll('.item-row');
  
  itemRows.forEach(row => {
    const itemName = row.querySelector('.item-name').value;
    const itemPrice = parseFloat(row.querySelector('.item-price').value);
    const itemQuantity = parseInt(row.querySelector('.item-quantity').value);
    
    if (itemName && itemPrice && itemQuantity) {
      items.push({ itemName, itemPrice, itemQuantity, total: itemPrice * itemQuantity });
    }
  });
  
  
  let subTotal = 0;
  items.forEach(item => subTotal += item.total);
  const tax = subTotal * taxRate;
  const totalAmount = subTotal + tax - discount;

  
  let invoiceHtml = `
    <h1 style="text-align: center; font-family: 'Times New Roman', Times, serif; font-size: 36px; background-color: black; color: white; margin-bottom: 0;">CHENNAI TAILORS</h1>
    <h4 style="text-align: center; background-color: black; color: white; margin-top: 0;">No.16, Nanjundeswar Nagar, Rayakotta Road, Hosur</h4>
    <p style="text-align: left;"><strong>Invoice Number:</strong> ${invoiceNumber}</p>
    <p style="text-align: left;"><strong>Customer:</strong> ${customerName}</p>
    <p style="text-align: left;"><strong>Invoice Date:</strong> ${invoiceDate}</p>
    <p style="text-align: left;"><strong>Mobile Number:</strong> ${mobileNumber}</p>
    <p style="text-align: left;"><strong>Address:</strong> ${address}</p>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  items.forEach(item => {
    invoiceHtml += `
      <tr>
        <td>${item.itemName}</td>
        <td>₹${item.itemPrice.toFixed(2)}</td>
        <td>${item.itemQuantity}</td>
        <td>₹${item.total.toFixed(2)}</td>
      </tr>
    `;
  });
  
  invoiceHtml += `
      </tbody>
    </table>
    <p style="text-align: left;"><strong>Subtotal:</strong> ₹${subTotal.toFixed(2)}</p>
    <p style="text-align: left;"><strong>Tax (${(taxRate * 100).toFixed(2)}%):</strong> ₹${tax.toFixed(2)}</p>
    <p style="text-align: left;"><strong>Discount:</strong> ₹${discount.toFixed(2)}</p>
    <p style="text-align: right; font-size: 24px;"><strong>Total:</strong> ₹${totalAmount.toFixed(2)}</p>
    <p style="text-align: center; font-size: 24px; margin-top: 20px;">Thanks for purchasing !!</p>
    <p style="text-align: center; font-size: 20px; margin-top: 20px;">For further details</p>
    <p style="text-align: center; margin-top: 20px;"><strong>Contact:</strong> +91 2233441155</p>
    <p style="text-align: center;"><strong>Email:</strong> chennaitailors45@gmail.com</p>
  `;
  
  invoiceOutput.innerHTML = invoiceHtml;
  invoiceOutput.style.display = 'block';
});


printBtn.addEventListener('click', function () {
  const invoiceNumber = generateInvoiceNumber(); 
  const invoiceContent = `
    <html>
      <head>
        <title>Tax Invoice</title> 
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #000;
            padding: 10px;
            text-align: left;
          }
          .invoice-number {
            text-align: right;
          }
          h1, h3 {
            text-align: center;
            font-family: 'Times New Roman', Times, serif;
            background-color: black;
            color: white;
            margin-bottom: 0;
          }
          h1 {
            font-size: 36px;
          }
          h2 {
            margin-top: 0;
          }
          .total-amount {
            text-align: right;
            font-size: 24px;
          }
          .thanks-message {
            text-align: center;
            font-size: 12px;
            margin-top: 20px;
          }
          .contact-info {
            text-align: center;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        ${invoiceOutput.innerHTML}
      </body>
    </html>
  `;
  const printWindow = window.open('', '', 'height=500, width=800');
  printWindow.document.write(invoiceContent);
  printWindow.document.close();
  printWindow.print();
});


downloadBtn.addEventListener('click', function () {
  const invoiceContent = `
    <html>
      <head>
        <title>Invoice</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #000;
            padding: 10px;
            text-align: left;
          }
          h1, h3 {
            text-align: center;
            font-family: 'Times New Roman', Times, serif;
            background-color: black;
            color: white;
            margin-bottom: 0;
          }
          h1 {
            font-size: 36px;
          }
          h2 {
            margin-top: 0;
          }
          .total-amount {
            text-align: right;
            font-size: 24px;
          }
          .thanks-message {
            text-align: center;
            font-size: 12px;
            margin-top: 20px;
          }
          .contact-info {
            text-align: center;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        ${invoiceOutput.innerHTML}
      </body>
    </html>
  `;

  const blob = new Blob([invoiceContent], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'invoice.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
