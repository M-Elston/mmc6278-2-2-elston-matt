const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    // TODO: Pull a random quote from the quotes.txt file
    // console log the quote and author
    // You may style the text with chalk as you wish

    try {
      const data = await fs.readFile(QUOTE_FILE, "utf8");
      const lines = data.split("\n").filter(line => line.trim() !== "");

      if (lines.length === 0) {
        console.log(chalk.yellow("No quotes found."));
        return;
      }

      const randomLine = lines[Math.floor(Math.random() * lines.length)];
      const [quote, author] = randomLine.split("|").map(s => s.trim());

      console.log(chalk.cyan(`"${quote}"`));
      console.log(chalk.green(`- ${author}`));
    } catch (error) {
        console.error(chalk.red("Error reading quotes:"), error.message);
    }
  });

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author) => {
    // TODO: Add the quote and author to the quotes.txt file
    // If no author is provided,
    // save the author as "Anonymous".
    // After the quote/author is saved,
    // alert the user that the quote was added.
    // You may style the text with chalk as you wish
    // HINT: You can store both author and quote on the same line using
    // a separator like pipe | and then using .split() when retrieving
    
    try {
      if (!author) author = "Anonymous";
      const newLine = `${quote} | ${author}\n`;
      await fs.appendFile(QUOTE_FILE, newLine);

      console.log(chalk.green("Quote added successfully!"));
    } catch (error) {
      console.error(chalk.red("Error adding quote:"), error.message);
    }
  });

program.parse();
