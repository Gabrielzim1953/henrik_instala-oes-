# Henrik Instalações

Site da Henrik Instalações (Jaíba-MG): som automotivo, insulfilm, vidro e trava elétrica, alarme, LED, central multimídia e acessórios.

Para ver o site, abra o `index.html` no navegador.

## Arquivos

Todos os arquivos ficam juntos na mesma pasta (sem subpastas), para facilitar o envio pelo GitHub.

| Arquivo | O que é |
|---|---|
| `index.html` | Página do site (todo o conteúdo e textos) |
| `style.css` | Cores, fontes e layout |
| `script.js` | Menu do celular, animações, galeria e formulário do WhatsApp |
| `banner.jpg` | Fundo do banner principal |
| `logo.png` | Logo do cabeçalho e do rodapé |
| `favicon.png` | Ícone da aba do navegador |
| `compartilhar.jpg` | Imagem que aparece ao enviar o link no WhatsApp/Instagram |
| `saveiro.mp4`, `saveiro-video.jpg`, `saveiro-1.jpg`, `saveiro-2.jpg` | Projeto Saveiro (vídeo, capa e fotos) |
| `projeto-x-1.jpg` ... `projeto-x-4.jpg` | Projeto X |
| `mavie-1.jpg` ... `mavie-3.jpg` | Projeto Mavie |
| `cabos.jpg`, `multimidia.jpg`, `led.jpg` | Outros trabalhos |

## Como alterar

- **Textos, serviços e contatos:** `index.html`
- **Cores:** variáveis no início de `style.css` (`--orange`, `--black`, etc.)
- **Número do WhatsApp:** aparece em `index.html` (links `wa.me/5538991281610`) e na primeira linha de `script.js`
- **Fotos:** coloque o arquivo novo nesta pasta e troque o nome no `index.html`. Use JPG de até ~250 KB, sem espaço no nome.

## Ao publicar o site

No `index.html`, procure `SEU-SITE` e troque pelo endereço do site (ex.: `https://henrikinstalacoes.com.br/compartilhar.jpg`). Sem isso, a imagem não aparece quando o link é enviado.

## Como adicionar um trabalho novo

1. Coloque as fotos nesta pasta.
2. No `index.html`, copie um bloco `<article class="work">` da seção de projetos.
3. Troque o `data-media` (lista das fotos/vídeo separadas por espaço), a imagem de capa, o título e a descrição.
