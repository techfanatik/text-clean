 function cleanText() {
        let text = document.getElementById("inputText").value;

        if (document.getElementById("keepParagraphs")?.checked) {
          text = text.replace(/\r?\n+/g, "\n\n");
        } else if (document.getElementById("removeLineBreaks").checked) {
          text = text.replace(/[\r\n]+/g, " ");
        }

        if (document.getElementById("removeSpaces").checked) {
          text = text.replace(/[ \t]+/g, " ").trim();
        }

        if (document.getElementById("removeEmojis").checked) {
          text = text.replace(
            /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu,
            ""
          );
          text = text.replace(/[ \t]+/g, " ").trim();
        }

        if (document.getElementById("removeHTML").checked) {
          text = text.replace(/<[^>]*>/g, "");
        }

        if (document.getElementById("removeDuplicates").checked) {
          const lines = text.split(/\r?\n/);
          const unique = [...new Set(lines.map((line) => line.trim()))];
          text = unique.join("\n");
        }

        if (document.getElementById("trimLines").checked) {
          text = text
            .split(/\r?\n/)
            .map((line) => line.trim())
            .join("\n");
        }

        if (document.getElementById("smartQuotes").checked) {
          text = text.replace(/"([^"]*)"/g, "“$1”");
          text = text.replace(/'([^']*)'/g, "‘$1’");
        }

        text = text.replace(/\s+([,.!?])/g, "$1");

        const caseOption = document.getElementById("caseOption").value;
        if (caseOption === "upper") text = text.toUpperCase();
        else if (caseOption === "lower") text = text.toLowerCase();
        else if (caseOption === "title") {
          text = text.replace(
            /\w\S*/g,
            (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
          );
        } else if (caseOption === "sentence") {
          text = text.toLowerCase();
          text = text.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        }

        document.getElementById("outputBox").textContent = text;
      }

      function clearText() {
        document.getElementById("inputText").value = "";
        document.getElementById("outputBox").textContent = "";
        updateStats();
      }

      function copyText() {
        const output = document.getElementById("outputBox").textContent;
        if (!output.trim()) return alert("⚠️ Nothing to copy!");
        navigator.clipboard.writeText(output);
        alert("✅ Text copied!");
      }

      function downloadText() {
        const output = document.getElementById("outputBox").textContent;
        if (!output.trim()) return alert("⚠️ Nothing to download!");
        const blob = new Blob([output], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "cleaned_text.txt";
        link.click();
      }

      function downloadWord() {
        const output = document.getElementById("outputBox").textContent;
        if (!output.trim()) return alert("⚠️ Nothing to download!");
        const blob = new Blob(["\ufeff", output], {
          type: "application/msword",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "cleaned_text.doc";
        link.click();
      }

      function downloadPDF() {
        const output = document.getElementById("outputBox").textContent;
        if (!output.trim()) return alert("⚠️ Nothing to download!");
        const win = window.open("", "_blank");
        win.document.write("<pre>" + output + "</pre>");
        win.print();
      }

      function updateStats() {
        const text = document.getElementById("inputText").value;
        const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
        const chars = text.length;
        const paras = text.trim() === "" ? 0 : text.split(/\n+/).length;
        document.getElementById(
          "stats"
        ).textContent = `Words: ${words} | Characters: ${chars} | Paragraphs: ${paras}`;
      }
      document
        .getElementById("inputText")
        .addEventListener("input", updateStats);

      function toggleDarkMode() {
        document.body.classList.toggle("dark");
      }