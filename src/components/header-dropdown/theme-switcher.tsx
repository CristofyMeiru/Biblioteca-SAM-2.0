import { useTheme } from 'next-themes';
import { Button } from '../ui/button';
import Icon from '../ui/icon';

export default function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  function handleSwitchTheme() {
    console.log(theme);
    if (theme == 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  return (
    <Button className=" w-full " variant={'outline'} onClick={handleSwitchTheme}>
      {theme == 'light' ? (
        <>
          <Icon name="sun" /> Tema claro
        </>
      ) : (
        <>
          <Icon name="moon" className=" text-white " /> Tema escuro
        </>
      )}
    </Button>
  );
}
