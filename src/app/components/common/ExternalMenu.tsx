import { getIconByName } from "./Icons";
import MenuItem from "./MenuItem";
import StarryBackground from "./StarryBackground";

type MenuProps = {
    isOpen: boolean;
    onClose: () => void;
};

const menuItems = [
    {
        icon: getIconByName('Home'),
        label: "Home",
        href: "/",
    },
    // {
    //     icon: getIconByName('Marketplace'),
    //     label: "Marketplace",
    //     href: "/marketplace",
    // },
    {
        icon: getIconByName('Tba'),
        label: "Create RWA",
        href: "/rwa-create",
    },
    {
        icon: getIconByName('Voting'),
        label: "Rwa List",
        href: "/rwa-list",
    },
    // {
    //     icon: getIconByName('Discussion'),
    //     label: "Rwa to valuate",
    //     href: "/rwa-to-valuate",
    // },
    {
        icon: getIconByName('AiTagging'),
        label: "Validators RWA",
        href: "/validators",
    },
    {
        icon: getIconByName('Assets'),
        label: "My assets",
        href: "/my-assets",
    },
    {
        icon: getIconByName('Help'),
        label: "Help",
        href: "/help",
    },
    {
        icon: getIconByName('About'),
        label: "About",
        href: "/about",
    }
];
const ExternalMenu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
        >

            <StarryBackground />
            <div className=" w-64 h-full p-4">
                {menuItems.map((item) => (
                    <MenuItem
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        href={item.href}
                    />
                ))}
            </div>
        </div>
    );
};

export default ExternalMenu;
