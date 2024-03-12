import { Box } from "@mui/material";
import { ReactNode } from "react";

export default function Panel({
  children,
  display,
}: {
  children: ReactNode | ReactNode[];
  display: "flex" | "grid" | "block";
}) {
  return (
    <Box component={"section"} sx={{ display, flexGrow: "1" }}>
      {children}
    </Box>
  );
}
