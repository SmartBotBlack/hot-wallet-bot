(async () => {
  const convertTime = async (input) => {
    const parts = input.split(" ");

    console.debug(parts);
    let hours = 0;
    let minutes = 0;

    for (let part of parts) {
      if (part.endsWith("h")) {
        hours = parseInt(part.slice(0, -1), 10);
      } else if (part.endsWith("m")) {
        minutes = parseInt(part.slice(0, -1), 10);
      }
    }

    const totalMilliseconds = hours * 60 * 60 * 1000 + minutes * 60 * 1000;

    return totalMilliseconds;
  };

  document
    .querySelector(
      "#root > div > div > div:nth-child(1) > div > div > div > div:nth-child(4) > div:nth-child(2)"
    )
    .click();

  await new Promise((res) => setTimeout(res, 3 * 1000));

  while (1) {
    try {
      const getTimeToRecovery = document.querySelector(
        "#root > div > div > div:nth-child(3) > div > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(2) > p:nth-child(2)"
      ).textContent;

      const btnClaimOrNews = document.querySelector(
        "#root > div > div > div:nth-child(3) > div > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(3) > button"
      );

      const gashot = document.querySelector(
        "body > div:nth-child(8) > div > div.react-modal-sheet-content > div > div > div:nth-child(3) > button"
      );

      if (getTimeToRecovery.includes("fill")) {
        const timeToRecovery = await convertTime(getTimeToRecovery);
        await new Promise((res) => setTimeout(res, timeToRecovery + 10000));
        continue;
      }

      if (gashot) {
        gashot.click();
      }

      btnClaimOrNews.click();
      const checkClickClaim = btnClaimOrNews.getAttribute("disabled");

      if (checkClickClaim == null) {
        btnClaimOrNews.click();
        await new Promise((res) => setTimeout(res, 10 * 1000));
      }

      const timeToRecovery = await convertTime(getTimeToRecovery);
      await new Promise((res) => setTimeout(res, timeToRecovery + 10000));
    } catch (error) {
      console.error(error);
      await new Promise((res) => setTimeout(res, 5 * 1000));
    }
  }
})();
