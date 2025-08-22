(() => {
	const saved = getCookie("ui-theme");
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const theme =
		saved === "light" || saved === "dark"
			? saved
			: prefersDark
				? "dark"
				: "light";
	const root = document.documentElement;
	if (theme === "dark") root.classList.add("dark");
	else root.classList.remove("dark");
})();

function getCookie(cookieName) {
	cookieName = `${cookieName}=`;
	const cookieData = document.cookie;
	let start = cookieData.indexOf(cookieName);
	let cookieValue = "";
	if (start !== -1) {
		start += cookieName.length;
		let end = cookieData.indexOf(";", start);
		if (end === -1) end = cookieData.length;
		cookieValue = cookieData.substring(start, end);
	}

	return decodeURIComponent(cookieValue);
}
