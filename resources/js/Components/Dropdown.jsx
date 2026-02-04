import { Transition } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { createContext, useContext, useState } from 'react';

const DropDownContext = createContext();

const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative z-[200]">{children}</div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }) => {
    const { open, setOpen, toggleOpen } = useContext(DropDownContext);

    return (
        <>
            <div onClick={toggleOpen} className="cursor-pointer">{children}</div>

            {open && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpen(false)}
                ></div>
            )}
        </>
    );
};

const Content = ({
    align = 'right',
    width = '48',
    contentClasses = 'py-2',
    children,
}) => {
    const { open, setOpen } = useContext(DropDownContext);

    let alignmentClasses = 'origin-top';

    if (align === 'left') {
        alignmentClasses = 'ltr:origin-top-left rtl:origin-top-right start-0';
    } else if (align === 'right') {
        alignmentClasses = 'ltr:origin-top-right rtl:origin-top-left end-0';
    }

    let widthClasses = '';

    if (width === '48') {
        widthClasses = 'w-56';
    }

    return (
        <>
            <Transition
                show={open}
                enter="transition-all ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-all ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div
                    className={`absolute z-[100] mt-3 rounded-2xl shadow-2xl ${alignmentClasses} ${widthClasses}`}
                    onClick={() => setOpen(false)}
                    style={{ 
                        backgroundColor: 'hsl(var(--card))',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                >
                    <div
                        className={
                            `rounded-2xl border border-border overflow-hidden ` +
                            contentClasses
                        }
                        style={{ backgroundColor: 'hsl(var(--card))' }}
                    >
                        {children}
                    </div>
                </div>
            </Transition>
        </>
    );
};

const DropdownLink = ({ className = '', children, ...props }) => {
    return (
        <Link
            {...props}
            className={
                'group flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-foreground ' +
                'transition-all duration-200 ease-out ' +
                'hover:bg-primary/10 hover:text-primary ' +
                'focus:bg-primary/10 focus:text-primary focus:outline-none ' +
                className
            }
        >
            {children}
        </Link>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
