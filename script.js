const $ = (id) => document.getElementById(id);

const formatMoney = (value, decimals = 2) => {
  if (!Number.isFinite(value)) return "$0.00";
  return "$" + value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

const formatCoins = (value) => {
  if (!Number.isFinite(value)) return "0";
  return value.toLocaleString(undefined, {
    maximumFractionDigits: 8,
  });
};

function calculateDCA() {
  const currentInvestment = Number($("currentInvestment").value);
  const currentAverage = Number($("currentAverage").value);
  const newInvestment = Number($("newInvestment").value);
  const newPrice = Number($("newPrice").value);

  if (
    currentInvestment <= 0 ||
    currentAverage <= 0 ||
    newInvestment <= 0 ||
    newPrice <= 0
  ) {
    $("note").textContent = "Please enter numbers greater than zero in all fields.";
    return;
  }

  const currentCoins = currentInvestment / currentAverage;
  const newCoins = newInvestment / newPrice;
  const totalInvested = currentInvestment + newInvestment;
  const totalCoins = currentCoins + newCoins;
  const newAverage = totalInvested / totalCoins;

  $("currentCoinsResult").textContent = formatCoins(currentCoins);
  $("newCoinsResult").textContent = formatCoins(newCoins);
  $("totalInvestedResult").textContent = formatMoney(totalInvested);
  $("totalCoinsResult").textContent = formatCoins(totalCoins);
  $("newAverageResult").textContent = formatMoney(newAverage, 4);

  const change = ((newAverage - currentAverage) / currentAverage) * 100;
  const direction = change < 0 ? "lowered" : "raised";
  $("note").textContent = `Your average has ${direction} by ${Math.abs(change).toFixed(2)}%.`;
}

function resetCalculator() {
  ["currentInvestment", "currentAverage", "newInvestment", "newPrice"].forEach(
    (id) => ($(id).value = "")
  );
  $("currentCoinsResult").textContent = "0";
  $("newCoinsResult").textContent = "0";
  $("totalInvestedResult").textContent = "$0.00";
  $("totalCoinsResult").textContent = "0";
  $("newAverageResult").textContent = "$0.0000";
  $("note").textContent = "Enter your numbers and hit calculate.";
}

$("calculateBtn").addEventListener("click", calculateDCA);
$("resetBtn").addEventListener("click", resetCalculator);

["currentInvestment", "currentAverage", "newInvestment", "newPrice"].forEach((id) => {
  $(id).addEventListener("keydown", (event) => {
    if (event.key === "Enter") calculateDCA();
  });
});
