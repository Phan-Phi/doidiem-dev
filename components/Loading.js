import { CircularProgress, Box, Fade } from "@mui/material";

const Loading = ({ isLoading }) => {
	return (
		<Fade in={isLoading} timeout={{
            exit: 1000
        }}>
			<Box sx={{ display: "flex" }}>
				<CircularProgress />
			</Box>
		</Fade>
	);
};

export default Loading;
