import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon, type FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

// Solid icons 
import {
  faBolt,
  faLock,
  faChartLine,
  faChartBar,
  faRobot,
  faGlobe,
  faMobileScreen,
  faRocket,
  faUniversity,
  faBalanceScale,
  faBell,
  faStar,
  faCheck,
  faCheckCircle,
  faCircleCheck,
  faTriangleExclamation,
  faEnvelope,
  faEnvelopeOpenText,
  faUsers,
  faCoins,
  faArrowsRotate,
  faArrowRight,
  faArrowLeft,
  faArrowRightArrowLeft,
  faArrowUp,
  faArrowDown,
  faNewspaper,
  faGraduationCap,
  faBook,
  faBookOpen,
  faChess,
  faMagnifyingGlass,
  faCircleInfo,
  faCode,
  faTerminal,
  faPlug,
  faBoxOpen,
  faKey,
  faBriefcase,
  faBuilding,
  faHandshake,
  faIdCard,
  faComments,
  faHeadset,
  faCircleDot,
  faWrench,
  faGear,
  faShield,
  faPen,
  faFileLines,
  faCookieBite,
  faScaleBalanced,
  faCircleExclamation,
  faThumbsUp,
  faTrophy,
  faFire,
  faTag,
  faBarsStaggered,
  faList,
  faTableCells,
  faSatelliteDish,
  faXmark,
  faToggleOn,
  faToggleOff,
  faCaretUp,
  faCaretDown,
  faHashtag,
  faPercent,
  faLandmarkDome,
  faGamepad,
  faPaperPlane,
  faBuildingColumns,
  faMap,
  faMapLocation,
  faLayerGroup,
  faNetworkWired,
  faServer,
  faBullhorn,
} from "@fortawesome/free-solid-svg-icons";

// Brand icons
import {
  faBitcoin,
  faEthereum,
  faXTwitter,
  faDiscord,
  faTelegram,
  faYoutube,
  faReddit,
  faGithub,
  faGoogle,
  faPython,
  faJs,
  faRust,
} from "@fortawesome/free-brands-svg-icons";

// Register everything so icons can be used by name string elsewhere if needed
library.add(
  faBolt, faLock, faChartLine, faChartBar, faRobot, faGlobe, faMobileScreen,
  faRocket, faUniversity, faBalanceScale, faBell, faStar, faCheck,
  faCheckCircle, faCircleCheck, faTriangleExclamation, faEnvelope,
  faEnvelopeOpenText, faUsers, faCoins, faArrowsRotate, faArrowRight,
  faArrowLeft, faArrowRightArrowLeft, faArrowUp, faArrowDown, faNewspaper,
  faGraduationCap, faBook, faBookOpen, faChess, faMagnifyingGlass,
  faCircleInfo, faCode, faTerminal, faPlug, faBoxOpen, faKey, faBriefcase,
  faBuilding, faHandshake, faIdCard, faComments, faHeadset,
  faCircleDot, faWrench, faGear, faShield, faPen, faFileLines, faCookieBite,
  faScaleBalanced, faCircleExclamation, faThumbsUp, faTrophy, faFire, faTag,
  faBarsStaggered, faList, faTableCells, faSatelliteDish, faXmark, faToggleOn,
  faToggleOff, faCaretUp, faCaretDown, faHashtag, faPercent,
  faLandmarkDome, faGamepad, faPaperPlane, faBuildingColumns, faMap,
  faMapLocation, faLayerGroup, faNetworkWired, faServer, faBullhorn,
  // brands
  faBitcoin, faEthereum, faXTwitter, faDiscord, faTelegram, faYoutube,
  faReddit, faGithub, faGoogle, faPython, faJs, faRust,
);

// Re-export the raw icon objects for direct use
export {
  faBolt, faLock, faChartLine, faChartBar, faRobot, faGlobe, faMobileScreen,
  faRocket, faUniversity, faBalanceScale, faBell, faStar, faCheck,
  faCheckCircle, faCircleCheck, faTriangleExclamation, faEnvelope,
  faEnvelopeOpenText, faUsers, faCoins, faArrowsRotate, faArrowRight,
  faArrowLeft, faArrowRightArrowLeft, faArrowUp, faArrowDown, faNewspaper,
  faGraduationCap, faBook, faBookOpen, faChess, faMagnifyingGlass,
  faCircleInfo, faCode, faTerminal, faPlug, faBoxOpen, faKey, faBriefcase,
  faBuilding, faHandshake, faIdCard, faComments, faHeadset,
  faCircleDot, faWrench, faGear, faShield, faPen, faFileLines, faCookieBite,
  faScaleBalanced, faCircleExclamation, faThumbsUp, faTrophy, faFire, faTag,
  faBarsStaggered, faList, faTableCells, faSatelliteDish, faXmark, faToggleOn,
  faToggleOff, faCaretUp, faCaretDown, faHashtag, faPercent,
  faLandmarkDome, faGamepad, faPaperPlane, faBuildingColumns, faMap,
  faMapLocation, faLayerGroup, faNetworkWired, faServer, faBullhorn,
  faBitcoin, faEthereum, faXTwitter, faDiscord, faTelegram, faYoutube,
  faReddit, faGithub, faGoogle, faPython, faJs, faRust,
};

// Typed wrapper

type IconProps = Omit<FontAwesomeIconProps, "icon"> & {
  icon: FontAwesomeIconProps["icon"];
};

export function Icon({ icon, className = "", ...props }: IconProps) {
  return (
    <FontAwesomeIcon
      icon={icon}
      className={className}
      {...props}
    />
  );
}
