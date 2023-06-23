import { NavLink } from "react-router-dom";

interface HeaderNavLinkProps {
  name: string;
  path: string;
}

const HeaderNavLink = ({ name, path }: HeaderNavLinkProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive ? "dark:text-aqua-blue text-dark-blue font-semibold" : ""
      }
    >
      <div className="p-3 relative after:h-[2.5px] after:w-[0px] after:bg-dark-blue after:dark:bg-aqua-blue after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300 hover:after:w-full">
        {name}
      </div>
    </NavLink>
  );
};

export default HeaderNavLink;
