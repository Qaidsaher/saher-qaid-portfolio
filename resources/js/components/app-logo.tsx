import AppLogoIcon from './app-logo-icon';
import { Link, usePage } from "@inertiajs/react";
import { type SharedData } from '@/types';
export default function AppLogo() {
    const { website } = usePage<SharedData>().props;

    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-sm">
                <AppLogoIcon className="size-5  text-white dark:text-black text-center flex justify-center items-center" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold"> {((website as { websiteName: string })?.websiteName) ?? "SaherQ Dev"}</span>
            </div>
        </>
    );
}
