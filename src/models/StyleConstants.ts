interface Theme {
    LINE_CHART_AXIS_AND_TEXT_COLOR: string;
    BAR_CHART_COLOR: string;
    PIE_CHART_WIN_COLOR: string;
    PIE_CHART_LOSS_COLOR: string;
}

export const DARK_MODE: Theme = {
    LINE_CHART_AXIS_AND_TEXT_COLOR: "rgb(255, 255, 255)",
    BAR_CHART_COLOR: "rgb(0, 145, 255)",
    PIE_CHART_WIN_COLOR: "rgb(33, 176, 60)",
    PIE_CHART_LOSS_COLOR: "rgb(171, 27, 42)"
};

export const LIGHT_MODE: Theme = {
    LINE_CHART_AXIS_AND_TEXT_COLOR: "rgb(0, 0, 0)",
    BAR_CHART_COLOR: "rgb(0, 145, 255, 0.4)",
    PIE_CHART_WIN_COLOR: "rgb(33, 176, 60, 0.4)",
    PIE_CHART_LOSS_COLOR: "rgb(171, 27, 42, 0.4)"
}

export const NO_GRID_LINE: string = "rgb(0, 0, 0, 0.0)";
