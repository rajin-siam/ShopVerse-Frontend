export const mockOrders = [
    {
      order_id: 1001,
      order_date: '2025-04-30',
      total_amount: 249.99,
      address_id: 501,
      payment_id: 701,
      email: 'john.doe@example.com',
      order_status: 'Delivered',
      items: [
        { order_item_id: 10001, product_id: 1, quantity: 2, ordered_product_price: 99.99, discount: 0 },
        { order_item_id: 10002, product_id: 5, quantity: 1, ordered_product_price: 49.99, discount: 0 },
      ]
    },
    {
      order_id: 1002,
      order_date: '2025-05-02',
      total_amount: 179.99,
      address_id: 502,
      payment_id: 702,
      email: 'jane.smith@example.com',
      order_status: 'Processing',
      items: [
        { order_item_id: 10003, product_id: 3, quantity: 1, ordered_product_price: 149.99, discount: 0 },
        { order_item_id: 10004, product_id: 8, quantity: 1, ordered_product_price: 29.99, discount: 0 },
      ]
    },
    {
      order_id: 1003,
      order_date: '2025-05-03',
      total_amount: 399.99,
      address_id: 503,
      payment_id: 703,
      email: 'robert.johnson@example.com',
      order_status: 'Shipped',
      items: [
        { order_item_id: 10005, product_id: 2, quantity: 1, ordered_product_price: 399.99, discount: 0 },
      ]
    },
    {
      order_id: 1004,
      order_date: '2025-05-04',
      total_amount: 89.98,
      address_id: 504,
      payment_id: 704,
      email: 'emily.wilson@example.com',
      order_status: 'Pending',
      items: [
        { order_item_id: 10006, product_id: 4, quantity: 2, ordered_product_price: 44.99, discount: 0 },
      ]
    },
    {
      order_id: 1005,
      order_date: '2025-05-05',
      total_amount: 299.97,
      address_id: 505,
      payment_id: 705,
      email: 'michael.brown@example.com',
      order_status: 'Cancelled',
      items: [
        { order_item_id: 10007, product_id: 6, quantity: 3, ordered_product_price: 99.99, discount: 0 },
      ]
    }
  ];
  
  export const productMapping = {
    1: 'Premium Wireless Headphones',
    2: 'Ultra HD Smart TV',
    3: 'Gaming Console',
    4: 'Bluetooth Speaker',
    5: 'Fitness Tracker',
    6: 'Smartphone',
    7: 'Laptop',
    8: 'Wireless Charger'
  };