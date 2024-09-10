import Image from 'next/image';
import Link from 'next/link';
import TopDown from '../Buttons/TopDown';
import ThemeButton from '../ThemeButton';

function Footer() {
  return (
    <>
      <TopDown />
      <footer className="border-t dark:border-t-gray-800 bg-white dark:bg-gray-950">
        <div className="relative text-primary px-4 /md:pl-4 py-16  flex flex-col justify-start sm:flex-row sm:justify-evenly basis-56 items-start gap-6">
          <div className="">
            <div className="absolute top-16 right-4 /bg-slate-400 p-2 rounded dark:bg-transparent md:hidden">
              <ThemeButton />
            </div>
            <Image
              height={250}
              width={120}
              src={'/images/logo_azul.svg'}
              alt="dunorte"
              loading="lazy"
              className="h-auto"
            />
            <p className="text-[10px] font-light mt-4 max-w-[220px]">
              {/* Preços e especificações sujeitos a alteração sem aviso prévio.
              
              <br /> */}
              J.P.P. Dunorte Solutions, LDA
              <br />
              NIF: <span className="font-bold">5000661783</span>
              <br />
              Estrada antiga da Sonif, Km26, Arm. A bairro do Kapalanga - Viana
            </p>
          </div>
          <div className="">
            <p className="text-sm font-bold mb-3">Informações</p>
            <ul className="space-y-2 text-xs font-light">
              {/* <li>
                <Link href="/infopayment" className="hover:underline">
                  Pagamentos
                </Link>
              </li> */}
              <li>
                <Link href="/help" className="hover:underline">
                  Ajuda
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/info/qrcodepaymentinfo"
                  className="hover:underline"
                >
                  Pagamento por qr code
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="">
            <p className="text-sm font-bold mb-3">Navegação</p>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:underline">
                  Categorias
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:underline">
                  Carrinho
                </Link>
              </li>
              <li>
                <Link href="/promotion" className="hover:underline">
                  Tá barato
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:underline">
                  Novidades
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <p className="text-sm font-bold mb-3">Localização</p>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <a
                  target="_blank"
                  href="https://www.google.com/maps/place/Dunorte+Solutions/@-8.9395222,13.4412931,21z/data=!4m6!3m5!1s0x1a51f5e9d2632be3:0xe021f727d8bb75e9!8m2!3d-8.9396601!4d13.4412822!16s%2Fg%2F11rdqtbwbb?entry=ttu"
                  className="hover:underline"
                >
                  Google Mapa
                </a>
              </li>
            </ul>
          </div>
          <div className="">
            <p className="text-sm font-bold mb-3">Contactos</p>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <a
                  href="mailto:online@dunorte.co.ao"
                  className="hover:underline"
                >
                  online@dunorte.co.ao
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline" target="_blank">
                  Whatsapp
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/dunortesolutions/"
                  className="hover:underline"
                  target="_blank"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
          <div className="">
            <p className="text-sm font-bold mb-3">Formas de Pagamento</p>
            <ul className="text-xs font-light flex flex-row gap-1 items-center">
              <li>
                <Image
                  width={32}
                  height={32}
                  src={'/images/payment-method/express.png'}
                  alt="multicaixa express"
                />
              </li>
              <li>
                <Image
                  width={32}
                  height={32}
                  src={'/images/payment-method/emis-qr-code.png'}
                  alt="multicaixa express"
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="p-4 md:pl-16 text-xs text-white bg-slate-800 flex flex-col gap-3 sm:flex-row sm:justify-between mb-10 md:mb-0">
          <p>
            &copy; J.P.P. Dunorte Solutions, LDA - Todos os Direitos Resevardos
          </p>
          <div className="space-x-4">
            <a href="#">Termos e Condições</a>
            <a href="#">Políticas de privacidade</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
