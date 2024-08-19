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
  const bluWinPercent = parseFloat(bluInputEl.value, 10);

  const redOpt = {
    btn: redBtn,
    inputEl: redInputEl,
    potEl: redPotEl,
    winP: 100 - bluWinPercent,
    potAmt: 0,
  };

  const bluOpt = {
    btn: bluBtn,
    inputEl: bluInputEl,
    potEl: bluPotEl,
    winP: bluWinPercent,
    potAmt: 0,
  };

  console.info(`Starting gamba with blu win percent set to ${bluWinPercent}`);
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

    // Technically you can get the most current value from the element at any point later
    // but fixing it here for consistent arithmetic throughout
    bluOpt.potAmt = balanceStrToInt(bluOpt.potEl.innerText);
    redOpt.potAmt = balanceStrToInt(redOpt.potEl.innerText);

    let betAmt = 0;
    let betOpt;

    const bluBet = calcModifiedBet(bluOpt);
    if (bluBet > 0) {
      betAmt = bluBet;
      betOpt = bluOpt;
    } else {
      const redBet = calcModifiedBet(redOpt);
      if (redBet > 0) {
        betAmt = redBet;
        betOpt = redOpt;
      }
    }

    if (betAmt > 0) {
      const altOpt = getAltOpt(betOpt);

      if (betOpt.inputEl.value !== `${betAmt}`) {
        setInput(betOpt.inputEl, betAmt);
        setInput(altOpt.inputEl, "");
      }

      if (isTimeUp) {
        handleClick(betOpt.btn, observer);
      }
    }
  }

  // Small helpers
  function getAltOpt(opt) {
    if (opt === redOpt) {
      return bluOpt;
    } else if (opt === bluOpt) {
      return redOpt;
    }
  }

  function calcOdds(opt) {
    return (opt.potAmt + getAltOpt(opt).potAmt) / opt.potAmt;
  }

  function calcEvenBet(opt) {
    // Bet required to break even based on the given win percent
    const alt = getAltOpt(opt);
    const multiplier = opt.winP / alt.winP;

    return Math.floor(alt.potAmt * multiplier - opt.potAmt);
  }

  function calcModifiedBet(betOpt) {
    const evenBet = calcEvenBet(betOpt);

    if (evenBet <= 0) {
      return 0;
    }

    const { potAmt, winP } = betOpt;

    if (potAmt === 0) {
      return 1;
    }

    const odds = calcOdds(betOpt);
    const winProbability = winP / 100;
    const kellyMultiplier =
      (odds * winProbability - (1 - winProbability)) / odds;

    // pot multiplier depends on how greedy you want to be on small pots
    // evenBet * 0.5 to minimise making the odds worse for ourselves
    return Math.round(
      Math.min(
        MAX_BET,
        potAmt * 10,
        evenBet * 0.5,
        Math.max(
          balance * BANKROLL_CAP * kellyMultiplier,
          Math.min(balance, MIN_BET),
        ),
      ),
    );
  }

  // eg '10.5K' => 10500
  function balanceStrToInt(str) {
    if (str.includes("M")) {
      return parseFloat(str) * 1000000;
    } else if (str.includes("K")) {
      return parseFloat(str) * 1000;
    } else return parseFloat(str);
  }

  // so React will internally update the value
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
})();
