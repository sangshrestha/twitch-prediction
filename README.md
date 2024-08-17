# twitch-prediction
Script to automate twitch predictions. Use as a bookmarklet.

## Setup
1. Right click your bookmark tab.
2. Select `Add page`.
3. Name what you like.
4. Copy code below and paste to URL.

```
javascript:(function()%7B(function()%7Bvar%20a%3D250000%2Cb%3D50%2Cc%3D0.2%2C%7BbalanceEl%3Ad%2CtimerEl%3Ae%2CbluBtn%3Af%2CredBtn%3Ag%2CbluInput%3Ah%2CredInput%3Ai%2CbluPotEl%3Aj%2CredPotEl%3Ak%7D%3Dp()%2Cl%3Dr(d.innerText)%2Cm%3DparseFloat(h.value%2C10)%2Cn%3D(100-m)%2Fm%3Bconsole.info(%60Starting%20gamba%20with%20blu%20win%20percent%20set%20to%20%24%7Bm%7D%60)%3Bh.blur()%3Bvar%20o%3Dnew%20MutationObserver(q)%3Bo.observe(e%2C%7Bsubtree%3A!0%2CcharacterData%3A!0%7D)%3Bfunction%20p()%7Bvar%20A%3Ddocument.querySelector('%23channel-points-reward-center-body')%2C_%3DA.querySelector('.prediction-checkout-details-header')%2CB%3Ddocument.querySelector('%5Bdata-test-selector%3D%5C'copo-balance-string%5C'%5D')%2CD%3D_.querySelectorAll('p')%5B1%5D%2C%5BE%2CF%5D%3DA.querySelectorAll('button')%2C%5BG%2CH%5D%3DA.querySelectorAll('input')%2CI%3Ddocument.querySelectorAll('.hERoTc')%3Breturn%7BbalanceEl%3AB%2CtimerEl%3AD%2CbluBtn%3AE%2CredBtn%3AF%2CbluInput%3AG%2CredInput%3AH%2CbluPotEl%3AI%5B1%5D%2CredPotEl%3AI%5B4%5D%7D%7Dfunction%20q(C%2C_b)%7Bvar%5B_c%2C_d%5D%3DC%5B0%5D.target.data.split('%3A')%2C_e%3D!parseInt(_c%2C10)%26%26parseInt(_d%2C10)%3C2%2C_f%3Dr(j.innerText)%2C_g%3Dr(k.innerText)%2C_h%3D(_f%2B_g)%2F_f%2C_i%3D(_f%2B_g)%2F_g%2CJ%3D~~_g%2Fn-_f%2CK%3D~~_f*n-_g%3Bif(K%3E0)%7Bvar%20L%3D!_g%3F1%3Au(K%2C_i%2C100-m%2C_g)%3Bi.value!%3D%3D%60%24%7BL%7D%60%26%26(s(i%2CL)%2Cs(h%2C''))%3B_e%26%26t(g%2C_b)%7Delse%20if(J%3E0)%7Bvar%20M%3D!_f%3F1%3Au(J%2C_h%2Cm%2C_f)%3Bh.value!%3D%3D%60%24%7BM%7D%60%26%26(s(h%2CM)%2Cs(i%2C''))%3B_e%26%26t(f%2C_b)%7D%7Dfunction%20r(_a)%7Bif(_a.includes('M'))return%20parseFloat(_a)*1000000%3Bif(_a.includes('K'))return%20parseFloat(_a)*1000%3Breturn%20parseFloat(_a)%7Dfunction%20s(_A%2C_B)%7Bvar%20_C%3DObject.getOwnPropertyDescriptor(window.HTMLInputElement.prototype%2C'value').set%3B_C.call(_A%2C_B)%3B_A.dispatchEvent(new%20Event('input'%2C%20%7Bbubbles%3A!0%7D))%7Dfunction%20t(aA%2CaB)%7BaA.click()%3BaB.disconnect()%7Dfunction%20u(aC%2CaD%2CaE%2C_D)%7Bvar%20_E%3DaE%2F100%3Breturn%20Math.round(Math.min(a%2C_D*10%2CaC*0.5%2CMath.max(l*Math.min((aD*_E-(1-_E))%2FaD%2Cc)%2CMath.min(l%2Cb))))%7D%7D)()%3B%7D)()
```

> Above code is minified `gamba.js`. If you don't trust it learn how to make a bookmarklet.

## Usage
1. Open prediction menu.
2. Type in the blu input % chance of blu outcome happening. (eg. if the prediciton was for a coin toss and blu was betting for heads you would type '50'.)
3. Do NOT click the twitch button. Do NOT press ENTER.
4. Click the bookmark you created in Setup.
