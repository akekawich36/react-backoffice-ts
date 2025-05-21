import { forwardRef, ReactNode } from "react";

// material-ui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material/styles";

// constant
const headerStyle = {
  "& .MuiCardHeader-action": { mr: 0 },
};

// Props type definition
interface MainCardProps {
  border?: boolean;
  boxShadow?: boolean;
  children?: ReactNode;
  content?: boolean;
  contentClass?: string;
  contentSX?: SxProps<Theme>;
  headerSX?: SxProps<Theme>;
  darkTitle?: boolean;
  secondary?: ReactNode;
  shadow?: string;
  sx?: SxProps<Theme>;
  title?: ReactNode;
  [key: string]: any;
}

const MainCard = forwardRef<HTMLDivElement, MainCardProps>(function MainCard(
  {
    border = false,
    boxShadow,
    children,
    content = true,
    contentClass = "",
    contentSX = {},
    headerSX = {},
    darkTitle,
    secondary,
    shadow,
    sx = {},
    title,
    ...others
  },
  ref
) {
  const defaultShadow = "0 2px 14px 0 rgb(32 40 45 / 8%)";

  return (
    <Card
      ref={ref}
      {...others}
      sx={{
        borderRadius: "12px",
        border: border ? "1px solid" : "none",
        borderColor: "divider",
        // ":hover": {
        //   boxShadow: boxShadow ? shadow || defaultShadow : "inherit",
        // },
        ...sx,
      }}
    >
      {!darkTitle && title && (
        <CardHeader
          sx={{ ...headerStyle, ...headerSX }}
          title={title}
          action={secondary}
        />
      )}
      {darkTitle && title && (
        <CardHeader
          sx={{ ...headerStyle, ...headerSX }}
          title={<Typography variant="h3">{title}</Typography>}
          action={secondary}
        />
      )}

      {title && <Divider />}

      {content ? (
        <CardContent sx={contentSX} className={contentClass}>
          {children}
        </CardContent>
      ) : (
        children
      )}
    </Card>
  );
});

export default MainCard;
