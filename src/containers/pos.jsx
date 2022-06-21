import { useAppBridge } from '@shopify/app-bridge-react';
import { Cart, Toast, Group } from '@shopify/app-bridge/actions';
import { Features } from '@shopify/app-bridge/actions';
import { useState } from 'react';

function POS() {
  const [cartContents, setCartContents] = useState(null);
  const [err, setErr] = useState('');

  const app = useAppBridge();
  const isCartEnabled = () => {
    return new Promise((resolve) => {
      const checkCartFeature = () => {
        return app.featuresAvailable(Group.Cart).then((features) => {
          return features.Cart[Cart.Action.FETCH].Dispatch;
        });
      };

      checkCartFeature()
        .then((isEnabled) => {
          setErr('cart feature: ' + isEnabled);
          if (isEnabled) {
            resolve(true);
          } else {
            const unsubscribe = app.subscribe(Features.Action.UPDATE, function () {
              checkCartFeature().then((isEnabled) => {
                if (isEnabled) {
                  resolve(true);
                  unsubscribe();
                }
              });
            });
          }
        })
        .catch((error) => {
          setErr('cartfeature error occured: ' + JSON.stringify(error));
        });
    });
  };

  const handleClick = () => {
    isCartEnabled().then((enabled) => {
      if (!enabled) {
        const toastOptions = {
          message: 'Cart is not Enabled',
          duration: 5000,
        };
        const toastNotice = Toast.create(app, toastOptions);
        toastNotice.dispatch(Toast.Action.SHOW);
        return;
      }
      const toastOptions = {
        message: 'Cart is Enabled',
        duration: 5000,
      };
      const toastNotice = Toast.create(app, toastOptions);
      toastNotice.dispatch(Toast.Action.SHOW);
      const cart = Cart.create(app);
      var unsubscriber = cart.subscribe(Cart.Action.UPDATE, function (payload) {
        const toastOptions = {
          message: JSON.stringify(payload),
          duration: 50000,
        };
        const toastNotice = Toast.create(app, toastOptions);
        toastNotice.dispatch(Toast.Action.SHOW);
        unsubscriber();
      });
      cart.dispatch(Cart.Action.FETCH);
    });
  };

  return (
    <>
      <button onClick={handleClick}>Button</button>
      <p> {JSON.stringify(cartContents)} </p>
      <p> Cart Status: {err} </p>
    </>
  );
}

export default POS;
