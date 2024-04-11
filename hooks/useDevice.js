import { useMediaQuery } from "@mui/material";

const useDevice = () => {
	const isMobile = useMediaQuery((theme) => {
		return theme.breakpoints.down("sm");
	});

	const isTablet = useMediaQuery((theme) => {
		return theme.breakpoints.down("md");
	});

	const isDesktop = useMediaQuery((theme) => {
		return theme.breakpoints.up("md");
	});

	const isMediumDesktop = useMediaQuery((theme) => {
		return theme.breakpoints.up("lg");
	});

	const isTable1200 = useMediaQuery('(max-width:1200px)');

	return {
		isMobile,
		isTablet,
		isDesktop,
		isMediumDesktop,
		isTable1200,
	};
};

export default useDevice;
