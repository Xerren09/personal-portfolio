import { Link } from "react-router";

/**
 * Automatically performs a react-router programmatic navigation via {@link Link} if {@link HTMLAnchorElement.href|href} is relative. Otherwise it uses a standard
 * anchor tag that opens a new page on activation. 
 * 
 * Navigations via {@link Link} will also set the navigation state to the originating path, as if it was a referrel:
 * 
 * ```js
 *  function SomeComp() {
 *      const location = useLocation();
 *      
 *      useEffect(() => {
 *          const previousPage = location.state.from; // { from: "/foo/bar" }
 *      }, []);
 *  }
 * ```
 * 
 * @param props 
 * @returns 
 */
export default function SmartLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        // If a link starts with / its for this website, do a programmatic SPA navigation. Otherwise do new tab.
        props.href?.startsWith("/") ? <Link state={{ from: window.location.pathname.toString() }} to={props.href} {...props}>{props.children}</Link> : <a {...props} target="_blank">{props.children}</a>
    );
}