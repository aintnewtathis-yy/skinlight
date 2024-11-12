let sidebar;
let lastScrollPosition;
let initialSidebarPosition;
let pinnedBottom = false;
let pinnedTop = false;
let setTop = false;
let setTopScroll = 0;
let innerScrollDifference = false;
let currentFixBot = 0;
let currentFixBotScroll = 0;
let scrolledDistanceDown = 0;
let currentOffsetTop = 0;

function sidebarStickyPositionCalculation() {
	if (window.innerWidth < 1025) {
		return;
	}
	currentOffsetTop = sidebar.offsetTop;
	if (lastScrollPosition > window.scrollY) {
		//up
		if (window.scrollY < initialSidebarPosition - 76) {
			/* console.log('#1 t'); */
			sidebar.style.top = `0`;
			sidebar.style.position = 'relative';
		} else if (Math.round(sidebar.getBoundingClientRect().top) >= 76) {
			/* console.log('#2 t'); */
			sidebar.style.top = `${76}px`;
			sidebar.style.position = 'sticky';
			pinnedTop = true;
		} else {
			if (pinnedTop) {
				pinnedBottom = false;
				lastScrollPosition = window.scrollY;
				return;
			}
			/* console.log('#3 t'); */
			sidebar.style.top = `${scrolledDistanceDown}px`;
			sidebar.style.position = 'relative';
		}
		pinnedBottom = false;
		lastScrollPosition = window.scrollY;
	} else {
		//down

		scrolledDistanceDown = currentFixBot ? window.scrollY - currentFixBotScroll : 0;
		const difference = sidebar.offsetHeight - window.innerHeight + initialSidebarPosition;
		pinnedTop = false;

		if (pinnedBottom) {
			lastScrollPosition = window.scrollY;
			return;
		}
		if (sidebar.offsetTop > 0) {
			/* console.log('#1 b'); */

			if (!setTop && !innerScrollDifference) {
				sidebar.style.position = 'relative';
				sidebar.style.top = `${currentOffsetTop}px`;
				setTop = true;
				setTopScroll = window.scrollY;
			} else if (setTop && innerScrollDifference) {
				/* console.log('#3 b'); */
				setTop = false;
				innerScrollDifference = 0;
				currentFixBot = sidebar.getBoundingClientRect().top;
				sidebar.style.position = 'sticky';
				sidebar.style.top = `${currentFixBot}px`;
				pinnedBottom = true;
			} else {
				lastScrollPosition = window.scrollY;
				innerScrollDifference =
					Math.round(sidebar.offsetHeight - window.innerHeight + 76) <=
					Math.round(window.scrollY - setTopScroll);

				return;
			}
		} else if (window.scrollY > difference) {
			/* console.log('#2 b'); */
			currentFixBot = sidebar.getBoundingClientRect().top;
			sidebar.style.position = 'sticky';
			sidebar.style.top = `${currentFixBot}px`;
			currentFixBotScroll = window.scrollY;
			pinnedBottom = true;
		}

		lastScrollPosition = window.scrollY;
	}
}

$effect(() => {
	lastScrollPosition = 0;
	initialSidebarPosition = sidebar.getBoundingClientRect().top;
});



<svelte:window onscroll={sidebarStickyPositionCalculation} />