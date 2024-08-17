const MAX_BET = 250000;

const rewardBody = document.querySelector(".reward-center-body");
const balance = balanceStrToInt(
  [
    ...document.querySelectorAll("[data-test-selector='copo-balance-string']"),
  ][0].querySelector("span").innerText,
);
const pees = [...rewardBody.querySelectorAll("p")];
timerEl = pees[1];
const buttons = [...rewardBody.querySelectorAll("button")];
const [yesBtn, noBtn] = [buttons[0], buttons[1]];
const spans = rewardBody.querySelectorAll(".ScAnimatedNumber-sc-1iib0w9-0");
const inputs = [...rewardBody.querySelectorAll("input")];
const [yesInput, noInput] = inputs;
const yesPercent = parseInt(yesInput.value, 10);

const config = {
  subtree: true,
  characterData: true,
};

function callback(mut, obs) {
  const timerText = mut[0].target.data;
  const [min, sec] = timerText.split(":");
  const timeUp = parseInt(min, 10) === 0 && parseInt(sec, 10) < 2;

  const [yesAmt, noAmt] = [
    balanceStrToInt(spans[0].innerHTML),
    balanceStrToInt(spans[4].innerHTML),
  ];

  const multiplier = (100 - yesPercent) / yesPercent;
  const [yesBet, noBet] = [
    Math.floor(noAmt / multiplier - yesAmt),
    Math.floor(yesAmt * multiplier - noAmt),
  ];
  const [yesBetAdjusted, noBetAdjusted] = [
    yesAmt === 0 ? 1 : adjustBet(yesBet, yesPercent, yesAmt),
    noAmt === 0 ? 1 : adjustBet(noBet, 100 - yesPercent, noAmt),
  ];

  if (noBet > 0) {
    if (noInput.value !== `${noBetAdjusted}`) {
      handleInput(noInput, noBetAdjusted);
      handleInput(yesInput, "");
    }
    if (timeUp) {
      handleClick(noBtn, obs);
    }
  } else if (yesBet > 0) {
    if (yesInput.value !== `${yesBetAdjusted}`) {
      handleInput(yesInput, yesBetAdjusted);
      handleInput(noInput, "");
    }
    if (timeUp) {
      handleClick(yesBtn, obs);
    }
  }
}

const gambaObserver = new MutationObserver(callback);
yesInput.blur();
gambaObserver.observe(timerEl, config);
console.log(`Starting prediction with yesOdds set to ${yesPercent}`);

function balanceStrToInt(str) {
  if (str.includes("M")) {
    return parseInt(str) * 1000000;
  } else if (str.includes("K")) {
    return parseInt(str) * 1000;
  } else return parseInt(str);
}

function handleInput(el, input) {
  const nativeSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value",
  ).set;
  const evt = new Event("input", { bubbles: true });

  nativeSetter.call(el, input);
  el.dispatchEvent(evt);
}

function handleClick(btn, obs) {
  btn.click();
  obs.disconnect();
  console.log("Clicked!");
}

function adjustBet(bet, odd, curr) {
  function bankroll(bal) {
    minRoll = 0.05;
    maxRoll = 0.2;

    const mult = minRoll + ((maxRoll - minRoll) / 100) * odd;
    return bal * mult;
  }

  return Math.round(
    Math.min(
      curr * 10,
      MAX_BET,
      bet * 0.8,
      Math.max(bankroll(balance), Math.min(balance, 100)),
    ),
  );
}
