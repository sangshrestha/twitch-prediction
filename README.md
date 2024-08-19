# twitch-prediction
Script to automate twitch predictions. Use as a bookmarklet.

## Setup
1. Right click your bookmark tab.
2. Select `Add page`.
3. Name what you like.
4. Copy code below and paste to URL.

```
javascript:(function()%7B(function()%7Bvar%20a%3D250000%2Cb%3D50%2Cc%3D0.2%2C%7BbalanceEl%3Ad%2CtimerEl%3Ae%2CbluBtn%3Af%2CredBtn%3Ag%2CbluInputEl%3Ah%2CredInputEl%3Ai%2CbluPotEl%3Aj%2CredPotEl%3Ak%7D%3Dq()%2Cl%3Dw(d.innerText)%2Cm%3DparseFloat(h.value%2C10)%2Cn%3D%7Bbtn%3Ag%2CinputEl%3Ai%2CpotEl%3Ak%2CwinP%3A100-m%2CpotAmt%3A0%7D%2Co%3D%7Bbtn%3Af%2CinputEl%3Ah%2CpotEl%3Aj%2CwinP%3Am%2CpotAmt%3A0%7D%3Bconsole.info(%60Starting%20gamba%20with%20blu%20win%20percent%20set%20to%20%24%7Bm%7D%60)%3Bh.blur()%3Bvar%20p%3Dnew%20MutationObserver(r)%3Bp.observe(e%2C%7Bsubtree%3A!0%2CcharacterData%3A!0%7D)%3Bfunction%20q()%7Bvar%20A%3Ddocument.querySelector('%23channel-points-reward-center-body')%2C_%3DA.querySelector('.prediction-checkout-details-header')%2CB%3Ddocument.querySelector('%5Bdata-test-selector%3D%5C'copo-balance-string%5C'%5D')%2CD%3D_.querySelectorAll('p')%5B1%5D%2C%5BE%2CF%5D%3DA.querySelectorAll('button')%2C%5BG%2CH%5D%3DA.querySelectorAll('input')%2CI%3Ddocument.querySelectorAll('.hERoTc')%3Breturn%7BbalanceEl%3AB%2CtimerEl%3AD%2CbluBtn%3AE%2CredBtn%3AF%2CbluInputEl%3AG%2CredInputEl%3AH%2CbluPotEl%3AI%5B1%5D%2CredPotEl%3AI%5B4%5D%7D%7Dfunction%20r(C%2C_b)%7Bvar%5B_c%2C_d%5D%3DC%5B0%5D.target.data.split('%3A')%2C_e%3D!parseInt(_c%2C10)%26%26parseInt(_d%2C10)%3C2%2C_h%3Du(o)%3Bo.potAmt%3Dw(o.potEl.innerText)%3Bn.potAmt%3Dw(n.potEl.innerText)%3Blet%20_f%3D0%3Blet%20_g%3Bif(_h%3E0)%7B_f%3D_h%3B_g%3Do%7Delse%7Bvar%20_i%3Du(n)%3B_i%3E0%26%26(_f%3D_i%2C_g%3Dn)%7Dif(_f%3E0)%7Bvar%20J%3Ds(_g)%2CK%3Dv(_f%2C_g)%3B_g.inputEl.value!%3D%3D%60%24%7BK%7D%60%26%26(x(_g.inputEl%2CK)%2Cx(J.inputEl%2C''))%3B_e%26%26y(_g.btn%2C_b)%7D%7Dfunction%20s(_a)%7Bif(_a%3D%3Dn)return%20o%3Bif(_a%3D%3Do)return%20n%7Dfunction%20t(_A)%7Breturn%20(_A.potAmt%2Bs(_A).potAmt)%2F_A.potAmt%7Dfunction%20u(aA)%7Bvar%20_B%3Ds(aA)%2C_C%3DaA.winP%2F_B.winP%3Breturn%20~~_B.potAmt*_C-aA.potAmt%7Dfunction%20v(aB%2CaC)%7Bvar%7BpotAmt%3AaD%2CwinP%3A_D%7D%3DaC%2C_E%3Dt(aC)%2C_F%3D_D%2F100%2C_G%3D(_E*_F-(1-_F))%2F_E%3Bif(!aD)return%201%3Breturn%20Math.round(Math.min(a%2CaD*10%2CaB*0.5%2CMath.max(l*c*_G%2CMath.min(l%2Cb))))%7Dfunction%20w(aE)%7Bif(aE.includes('M'))return%20parseFloat(aE)*1000000%3Bif(aE.includes('K'))return%20parseFloat(aE)*1000%3Breturn%20parseFloat(aE)%7Dfunction%20x(aF%2CaG)%7Bvar%20aH%3DObject.getOwnPropertyDescriptor(window.HTMLInputElement.prototype%2C'value').set%3BaH.call(aF%2CaG)%3BaF.dispatchEvent(new%20Event('input'%2C%20%7Bbubbles%3A!0%7D))%7Dfunction%20y(aI%2CaJ)%7BaI.click()%3BaJ.disconnect()%7D%7D)()%3B%7D)()
```

> Above code is minified `gamba.js`. If you don't trust it learn how to make a bookmarklet.

## Usage
1. Open prediction menu.
2. Type in the blu input % chance of blu outcome happening. (eg. if the prediciton was for a coin toss and blu was betting for heads you would type '50'.)
3. Do NOT click the twitch button. Do NOT press ENTER.
4. Click the bookmark you created in Setup.
