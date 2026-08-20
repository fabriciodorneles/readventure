export type Lang = 'pt' | 'en';

/** Locale passado ao reconhecimento de fala do navegador */
export const speechLocale: Record<Lang, string> = {
  pt: 'pt-BR',
  en: 'en-US',
};

type Strings = {
  whoAreYou: string;
  skin: string;
  hair: string;
  shirt: string;
  start: string;
  read: string;
  wear: string;
  openChest: string;
  newAdventure: string;
  praise: string[];
  almost: string;
  tryAgain: string;
  didntHear: string;
  speakClose: string;
  listening: string;
  tapAndRead: string;
  micBlocked: string;
  micBlockedHint: string;
  noSpeechApi: string;
  noSpeechApiHint: string;
  readNameToWin: string;
  readNameRetry: string;
  parentArea: string;
  textStyle: string;
  uppercase: string;
  normalCase: string;
  language: string;
  resetAdventure: string;
  resetConfirm: string;
  close: string;
};

const pt: Strings = {
  whoAreYou: 'QUEM É VOCÊ?',
  skin: 'PELE',
  hair: 'CABELO',
  shirt: 'CAMISETA',
  start: 'COMEÇAR! 🚀',
  read: '📖 LER!',
  wear: 'USAR!',
  openChest: 'ABRA O BAÚ! ✨',
  newAdventure: 'NOVA AVENTURA EM BREVE ✨',
  praise: ['CONSEGUIU!', 'BOA!', 'MUITO BEM!'],
  almost: 'QUASE!',
  tryAgain: 'VAMOS DE NOVO.',
  didntHear: 'NÃO OUVI...',
  speakClose: 'FALE PERTINHO! 🎤',
  listening: 'ESTOU OUVINDO... 👂',
  tapAndRead: 'TOQUE E LEIA EM VOZ ALTA',
  micBlocked: 'O MICROFONE ESTÁ BLOQUEADO.',
  micBlockedHint: '(peça para um adulto liberar o microfone no navegador)',
  noSpeechApi: 'ESTE NAVEGADOR NÃO TEM MICROFONE MÁGICO.',
  noSpeechApiHint: '(experimente o Chrome ou o Edge)',
  readNameToWin: 'LEIA O NOME PARA GANHAR!',
  readNameRetry: 'QUASE! LEIA O NOME DE NOVO.',
  parentArea: 'Área dos pais',
  textStyle: 'Estilo do texto',
  uppercase: 'MAIÚSCULAS',
  normalCase: 'Normal',
  language: 'Idioma / Language',
  resetAdventure: 'Recomeçar aventura do zero',
  resetConfirm: 'Apagar todo o progresso da aventura?',
  close: 'Fechar',
};

const en: Strings = {
  whoAreYou: 'WHO ARE YOU?',
  skin: 'SKIN',
  hair: 'HAIR',
  shirt: 'SHIRT',
  start: "LET'S GO! 🚀",
  read: '📖 READ!',
  wear: 'WEAR IT!',
  openChest: 'OPEN THE CHEST! ✨',
  newAdventure: 'NEW ADVENTURE COMING SOON ✨',
  praise: ['YOU DID IT!', 'NICE!', 'GREAT JOB!'],
  almost: 'ALMOST!',
  tryAgain: "LET'S TRY AGAIN.",
  didntHear: "I DIDN'T HEAR YOU...",
  speakClose: 'SPEAK CLOSE TO THE MIC! 🎤',
  listening: "I'M LISTENING... 👂",
  tapAndRead: 'TAP AND READ OUT LOUD',
  micBlocked: 'THE MICROPHONE IS BLOCKED.',
  micBlockedHint: '(ask a grown-up to allow the microphone in the browser)',
  noSpeechApi: 'THIS BROWSER HAS NO MAGIC MICROPHONE.',
  noSpeechApiHint: '(try Chrome or Edge)',
  readNameToWin: 'READ THE NAME TO WIN IT!',
  readNameRetry: 'ALMOST! READ THE NAME AGAIN.',
  parentArea: 'Parent area',
  textStyle: 'Text style',
  uppercase: 'UPPERCASE',
  normalCase: 'Normal',
  language: 'Idioma / Language',
  resetAdventure: 'Restart the adventure',
  resetConfirm: 'Erase all adventure progress?',
  close: 'Close',
};

export function getStrings(lang: Lang): Strings {
  return lang === 'en' ? en : pt;
}
