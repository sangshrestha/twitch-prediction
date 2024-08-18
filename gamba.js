(function () {
  const MAX_BET = 250000;
  const MIN_BET = 50;
  const BANKROLL_CAP = 0.2;

  const {
    balanceEl,
    timerEl,
    bluBtn,
    redBtn,
    bluInputEl,
    redInputEl,
    bluPotEl,
    redPotEl,
  } = queryEls();

  const balance = balanceStrToInt(balanceEl.innerText);
  const bluPercent = parseFloat(bluInputEl.value, 10);
  const bluEvenMultiplier = (100 - bluPercent) / bluPercent;

  console.info(`Starting gamba with blu win percent set to ${bluPercent}`);
  bluInputEl.blur();
  const gambaObserver = new MutationObserver(gamba);
  gambaObserver.observe(timerEl, {
    subtree: true,
    characterData: true,
  });

  function queryEls() {
    const rewardsDialog = document.querySelector(
      "#channel-points-reward-center-body",
    );

    const predictionHeader = rewardsDialog.querySelector(
      ".prediction-checkout-details-header",
    );

    const balanceEl = document.querySelector(
      "[data-test-selector='copo-balance-string']",
    );

    // First `p` is the prediction title
    const timerEl = predictionHeader.querySelectorAll("p")[1];

    const buttons = rewardsDialog.querySelectorAll("button");
    const [bluBtn, redBtn] = buttons;

    const inputs = rewardsDialog.querySelectorAll("input");
    const [bluInputEl, redInputEl] = inputs;

    const textEls = document.querySelectorAll(".hERoTc");

    return {
      balanceEl,
      timerEl,
      bluBtn,
      redBtn,
      bluInputEl,
      redInputEl,
      bluPotEl: textEls[1],
      redPotEl: textEls[4],
    };
  }

  function gamba(mutations, observer) {
    // This is the timer text in xx:xx format
    const [minute, sec] = mutations[0].target.data.split(":");
    const isTimeUp = parseInt(minute, 10) === 0 && parseInt(sec, 10) < 2;

    const bluPotAmt = balanceStrToInt(bluPotEl.innerText);
    const redPotAmt = balanceStrToInt(redPotEl.innerText);

    const bluOdds = (bluPotAmt + redPotAmt) / bluPotAmt;
    const redOdds = (bluPotAmt + redPotAmt) / redPotAmt;

    // Bet required to break even based on the given odds
    const bluEvenBet = Math.floor(redPotAmt / bluEvenMultiplier - bluPotAmt);
    const redEvenBet = Math.floor(bluPotAmt * bluEvenMultiplier - redPotAmt);

    if (redEvenBet > 0) {
      const redBetAdjusted = adjustBet(
        redEvenBet,
        redOdds,
        100 - bluPercent,
        redPotAmt,
      );

      if (redInputEl.value !== `${redBetAdjusted}`) {
        setInput(redInputEl, redBetAdjusted);
        setInput(bluInputEl, "");
      }
      if (isTimeUp) {
        handleClick(redBtn, observer);
      }
    } else if (bluEvenBet > 0) {
      const bluBetAdjusted = adjustBet(
        bluEvenBet,
        bluOdds,
        bluPercent,
        bluPotAmt,
      );

      if (bluInputEl.value !== `${bluBetAdjusted}`) {
        setInput(bluInputEl, bluBetAdjusted);
        setInput(redInputEl, "");
      }
      if (isTimeUp) {
        handleClick(bluBtn, observer);
      }
    }
  }

  function balanceStrToInt(str) {
    if (str.includes("M")) {
      return parseFloat(str) * 1000000;
    } else if (str.includes("K")) {
      return parseFloat(str) * 1000;
    } else return parseFloat(str);
  }

  function setInput(inputEl, value) {
    const nativeSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value",
    ).set;
    const evt = new Event("input", { bubbles: true });

    nativeSetter.call(inputEl, value);
    inputEl.dispatchEvent(evt);
  }

  function handleClick(btn, obs) {
    btn.click();
    obs.disconnect();
  }

  function adjustBet(evenBet, odds, percent, pot) {
    if (pot === 0) {
      return 1;
    }

    const winProbability = percent / 100;
    const kellyMultiplier =
      (odds * winProbability - (1 - winProbability)) / odds;

    return Math.round(
      Math.min(
        MAX_BET,
        pot * 10,
        evenBet * 0.5,
        Math.max(
          balance * Math.min(kellyMultiplier, BANKROLL_CAP),
          Math.min(balance, MIN_BET),
        ),
      ),
    );
  }
})();
