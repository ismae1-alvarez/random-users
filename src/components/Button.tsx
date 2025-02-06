
type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const BaseButton: React.FC<BaseButtonProps> = ({ children, ...props }) => {
  return <button className="bg-gray-200 md:py-2 md:px-4 py-1 px-2 hover:cursor-pointer rounded-md md:text-xl text-lg" {...props}>{children}</button>;
};

interface WithDynamicFunctionalityProps extends BaseButtonProps {
    executeFunction?: () => void; 
}

const withDynamicFunctionality = <P extends BaseButtonProps>(
    WrappedComponent: React.ComponentType<P>
  ) => {
    return ({ executeFunction, ...props }: P & WithDynamicFunctionalityProps) => {
      const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (executeFunction) {
          executeFunction(); // Se ejecuta la función que se pasó como prop
        }
        if (props.onClick) {
          props.onClick(event); // Ejecuta el evento onClick original
        }
      };
  
      return <WrappedComponent {...(props as P)} onClick={handleClick} />;
    };
  };

export const ButtonWithCustomFunction = withDynamicFunctionality(BaseButton);

