import AppDispatcher from "../AppDispatcher";
import {ReduceStore} from "flux/utils";
import {DetailedActionTypes} from "./Actions";
import Enumerable from "linq";
import lens_image from "../../Assets/images/lens.png";
import download_image from "../../Assets/images/download.png";

const defaultBound = {
    xMin: 3300,
    xMax: 7200,
    yMin: -500,
    yMax: 1000,
    top: 30,
    bottom: 30,
    left: 60,
    right: 20,
    width: 300,
    height: 300,
    lockedBounds: false,
    callout: false
};

const defaultView = {
    defaultMin: 3300,
    defaultMax: 7200,
    mainBound: {...defaultBound},
    bounds: [{...defaultBound}]
};

const defaultDetailed = {
    bounds: {
        redshiftMin: 0,
        redshiftMax: 5,
        maxMatches: 5,
        maxSmooth: 7
    },
    templateOffset: 0,
    onlyQOP0: true,
    templateId: '0',
    continuum: true,
    redshift: "0",
    oldRedshift: "0",
    matchedActive: true,
    matchedIndex: null,
    rangeIndex: 0,
    ranges: [100, 99.5, 99, 98],
    mergeIndex: 0,
    smooth: "3",
    width: 300,
    spectraFocus: null,
    spectralLines: true,
    waitingForSpectra: false,
    lockedBounds: false,
    lockedBoundsCounter: 1,
    skyHeight: 125
};

const defaultState = {
    requested: false,

    annotationColour: "#F00",
    xcor: true,
    xcorData: null,
    xcorHeight: 100,
    xcorLineColour: "#F00",
    xcorPlotColour: "#333",
    xcorLineHighlight: "#FFA600",
    xcorBound: {
        top: 15,
        left: 5,
        right: 5,
        bottom: 5,
        height: 100,
        width: 300,
        callout: true,
        xcorCallout: true
    },

    callout: false,
    maxCallouts: 8,
    minCalloutWidth: 350,
// array of [min lambda, max lambda, relative importance of
// viewing that cutout] to define callout windows
    callouts: Enumerable.from([[1000, 1100, 5], [1200, 1260, 10], [1500, 1600, 2], [1850, 2000, 3],
        [2700, 2900, 4], [3700, 3780, 10], [3800, 4100, 7], [4250, 4400, 5], [4800, 5100, 8], [6500, 6800, 9], [6700, 6750, 6]]),
    baseBottom: 40,
    baseTop: 30,
    templateScale: '1',
    minScale: 0.2,
    maxScale: 5,

    axesColour: '#444',
    zeroLineColour: '#111',
    stepColour: '#DDD',
    dragInteriorColour: 'rgba(38, 147, 232, 0.2)',
    dragOutlineColour: 'rgba(38, 147, 232, 0.6)',
    spacingFactor: 1.4,
    calloutSpacingFactor: 1.3,
    templateFactor: 1.5,

    zoomOutWidth: 40,
    zoomOutXOffset: 10,
    zoomOutYOffset: 50,
    downloadYOffset: -10,
    zoomOutHeight: 40,

    cursorColour: 'rgba(104, 0, 103, 0.9)',
    cursorTextColour: '#FFFFFF',
    cursorXGap: 2,
    cursorYGap: 2,

    data: Enumerable.empty(),
    baseData: null,
    template: null,

    labelWidth: 120,
    labelHeight: 60,
    labelFont: '10pt Verdana',
    labelFill: '#222',

    minDragForZoom: 20,
    displayingSpectralLines: true,
    spectralLineColours: ['rgba(0, 115, 255, 1)', 'rgba(0, 115, 255, 1)', 'rgba(30, 200, 50, 1)'],
    spectralLineTextColour: '#FFFFFF',

    templatePixelOffset: 30,

    focusDataX: null,
    focusDataY: null,
    focusCosmeticColour: 'rgba(104, 0, 103, 0.9)',
    focusCosmeticMaxRadius: 6,


    zoomXRatio: 0.8,

    height: 100,
    width: 300,

    startRawTruncate: 5,

    lastXDown: null,
    lastYDown: null,
    currentMouseX: null,
    currentMouseY: null,

    ratio: window.devicePixelRatio || 1.0,
    scale: 1.0,
    canvasWidth: 0.0,
    canvasHeight: 0.0,

    detailed: {
        ...defaultDetailed
    },
    view: {
        ...defaultView
    }
};

class DetailedStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return {
            spectra: [
                {
                    ...defaultState
                }
            ]
        }
    }

    reduce(state, action) {
        switch (action.type) {
            case DetailedActionTypes.UPDATE_REDSHIFT:

                // Update the redshift
                state.spectra[action.id].detailed.redshift = action.redshift;

                return {
                    ...state,
                };

            case DetailedActionTypes.UPDATE_TEMPLATE_OFFSET:

                // Update the template offset
                state.spectra[action.id].detailed.templateOffset = action.templateOffset;

                return {
                    ...state,
                };

            case DetailedActionTypes.UPDATE_BOUNDS:

                // Update the bounds
                state.spectra[action.id].detailed.bounds = action.bounds;

                return {
                    ...state,
                };
            default:
                return state;
        }
    }
}

export default new DetailedStore();