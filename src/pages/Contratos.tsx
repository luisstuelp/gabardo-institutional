"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHeader } from "@/contextos/Header";
import {
  Search,
  Plus,
  Upload,
  FileText,
  X,
} from "lucide-react";
import TabelaContratos from "@/componentes/TabelaContratos";
import { supabase } from "@/lib/supabase";

export default function Principal() {
  const {
    darkMode,
    fecharMenus,
    alterarMenuChamadas,
    menuAbertoChamadas,
  } = useHeader();

  const [pesquisa, setPesquisa] =
    useState("");

  /*
   * Dados do contrato
   */
  const [empresa, setEmpresa] =
    useState("");

  const [servico, setServico] =
    useState("");

  const [dataInicio, setDataInicio] =
    useState("");

  const [dataFim, setDataFim] =
    useState("");

  const [valorMensal, setValorMensal] =
    useState("");

  const [arquivo, setArquivo] =
    useState<File | null>(null);

  /*
   * Controle do envio
   */
  const [loading, setLoading] =
    useState(false);

  const [erros, setErros] =
    useState("");

  const bg = darkMode
    ? "#18181B"
    : "#f7f7f9";

  const border = darkMode
    ? "#2f2f3e"
    : "#9090ffbb";

  const text = darkMode
    ? "#e8e8ea"
    : "#0f172a";

  const inputBg = darkMode
    ? "#1c1c21"
    : "#F9F9F7";

  const accent = darkMode
    ? "#3b83f638"
    : "#1904fd28";

  const placeholderColor = darkMode
    ? "#71717a"
    : "#9ca3af";

  const muted = darkMode
    ? "#6b6b78"
    : "#6b7280";

  const primary = darkMode
    ? "#1e3a8a"
    : "#1904fd";

  const primaryHover = darkMode
    ? "#1e40af"
    : "#1904fd";

  /*
   * Seleciona o PDF.
   */
  const selecionarArquivo = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setErros("");

    const file =
      e.target.files?.[0];

    if (!file) {
      setArquivo(null);
      return;
    }

    /*
     * Garante que seja PDF.
     */
    if (
      file.type !==
      "application/pdf"
    ) {
      setArquivo(null);
      setErros(
        "O arquivo precisa ser um PDF."
      );
      e.target.value = "";
      return;
    }

    /*
     * Limite de 20 MB.
     */
    if (
      file.size >
      20 * 1024 * 1024
    ) {
      setArquivo(null);
      setErros(
        "O PDF não pode possuir mais de 20 MB."
      );
      e.target.value = "";
      return;
    }

    setArquivo(file);
  };

  /*
   * Remove o arquivo selecionado.
   */
  const removerArquivo = () => {
    setArquivo(null);

    const input =
      document.getElementById(
        "arquivo-contrato"
      ) as HTMLInputElement | null;

    if (input) {
      input.value = "";
    }
  };

  /*
   * Envia o contrato.
   *
   * O período NÃO é enviado.
   *
   * A RPC calcula automaticamente:
   *
   * data_fim - data_inicio
   *
   * e salva o resultado em periodo.
   */
  const submitContrato = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setErros("");

    try {
      /*
       * =========================
       * VALIDAÇÕES
       * =========================
       */

      const errosValidacao: string[] =
        [];

      if (
        empresa.trim().length < 2
      ) {
        errosValidacao.push(
          "Por favor, informe uma empresa válida."
        );
      }

      if (
        servico.trim().length < 2
      ) {
        errosValidacao.push(
          "Por favor, informe o serviço do contrato."
        );
      }

      if (!dataInicio) {
        errosValidacao.push(
          "Por favor, informe a data de início."
        );
      }

      if (!dataFim) {
        errosValidacao.push(
          "Por favor, informe a data de fim."
        );
      }

      if (
        dataInicio &&
        dataFim &&
        new Date(dataFim) <
        new Date(dataInicio)
      ) {
        errosValidacao.push(
          "A data de fim não pode ser anterior à data de início."
        );
      }

      /*
       * Valor mensal é opcional.
       *
       * Se preenchido, precisa ser
       * maior ou igual a zero.
       */
      let valorMensalNumerico:
        number | null = null;

      if (
        valorMensal.trim() !== ""
      ) {
        const valor =
          Number(
            valorMensal.replace(
              ",",
              "."
            )
          );

        if (
          Number.isNaN(valor) ||
          valor < 0
        ) {
          errosValidacao.push(
            "O valor mensal precisa ser um número válido."
          );
        } else {
          valorMensalNumerico =
            valor;
        }
      }

      if (!arquivo) {
        errosValidacao.push(
          "Por favor, selecione o PDF do contrato."
        );
      }

      if (
        errosValidacao.length > 0
      ) {
        setErros(
          errosValidacao
            .map(
              (
                erro,
                index
              ) =>
                `${index +
                1
                }. ${erro}`
            )
            .join("\n")
        );

        return;
      }

      /*
       * =========================
       * UPLOAD DO PDF
       * =========================
       */

      if (!arquivo) {
        throw new Error(
          "Nenhum arquivo foi selecionado."
        );
      }

      const extensao =
        arquivo.name
          .split(".")
          .pop()
          ?.toLowerCase() ||
        "pdf";

      const nomeArquivo = `${crypto.randomUUID()}.${extensao}`;

      const caminhoArquivo =
        `documentos/${nomeArquivo}`;

      const {
        error: uploadError,
      } =
        await supabase.storage
          .from(
            "documentos"
          )
          .upload(
            caminhoArquivo,
            arquivo,
            {
              cacheControl:
                "3600",
              upsert: false,
              contentType:
                "application/pdf",
            }
          );

      if (uploadError) {
        throw new Error(
          `Erro ao enviar o PDF: ${uploadError.message}`
        );
      }

      /*
       * =========================
       * CRIA CONTRATO
       * =========================
       *
       * O período será calculado
       * automaticamente dentro da RPC.
       */
      const {
        error: contratoError,
      } =
        await supabase.rpc(
          "criar_contrato",
          {
            p_empresa:
              empresa.trim(),

            p_servico:
              servico.trim(),

            p_arquivo:
              caminhoArquivo,

            p_data_inicio:
              dataInicio,

            p_data_fim:
              dataFim,

            p_valor_mensal:
              valorMensalNumerico,
          }
        );

      /*
       * Se o INSERT falhar,
       * remove o PDF que já havia
       * sido enviado ao Storage.
       */
      if (contratoError) {
        await supabase.storage
          .from("documentos")
          .remove([
            caminhoArquivo,
          ]);

        throw new Error(
          `Erro ao criar contrato: ${contratoError.message}`
        );
      }

      /*
       * =========================
       * LIMPA FORMULÁRIO
       * =========================
       */

      setEmpresa("");
      setServico("");
      setDataInicio("");
      setDataFim("");
      setValorMensal("");
      setArquivo(null);
      setErros("");

      const input =
        document.getElementById(
          "arquivo-contrato"
        ) as HTMLInputElement | null;

      if (input) {
        input.value = "";
      }

      fecharMenus();
    } catch (error) {
      console.error(
        "Erro ao criar contrato:",
        error
      );

      if (
        error instanceof Error
      ) {
        setErros(error.message);
      } else {
        setErros(
          "Ocorreu um erro ao criar o contrato."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        className="
                    flex-col
                    relative
                    min-h-screen
                    overflow-x-hidden
                    flex
                    px-25
                    pt-14
                "
        animate={{
          background: bg,
          color: text,
        }}
      >
        <motion.div
          className="
                        flex
                        items-end
                        justify-between
                        pt-12
                        pb-10
                    "
        >
          <motion.div className="w-200">
            <motion.h2
              initial={{
                opacity: 0,
                y: 5,
              }}
              animate={{
                opacity: 1,
                y: 0,
                color: text,
              }}
              className="
                                text-5xl
                                font-semibold
                                tracking-tight
                                text-zinc-900
                                dark:text-zinc-100
                            "
            >
              Todos os contratos
            </motion.h2>

            <motion.div className="relative w-full mt-5">
              <motion.input
                type="text"
                value={pesquisa}
                onChange={(e) =>
                  setPesquisa(
                    e.target
                      .value
                  )
                }
                placeholder="Pesquisar por serviço, fornecedor, datas..."
                className="
                                    w-full
                                    py-3
                                    pl-12
                                    pr-4
                                    text-sm
                                    border
                                    outline-none
                                    rounded-sm
                                "
                animate={{
                  background:
                    inputBg,
                  borderColor:
                    border,
                  color: text,
                }}
                onFocus={(e) =>
                (e.target.style.borderColor =
                  accent)
                }
                onBlur={(e) =>
                (e.target.style.borderColor =
                  border)
                }
              />

              <motion.div
                className="
                                    absolute
                                    left-3
                                    top-1/2
                                    -translate-y-1/2
                                    pointer-events-none
                                "
                animate={{
                  color: placeholderColor,
                }}
              >
                <Search size={25} />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.button
            onClick={
              alterarMenuChamadas
            }
            whileHover={{
              y: -1,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="
                            flex
                            items-center
                            gap-2
                            rounded-lg
                            bg-zinc-900
                            px-4
                            py-2.5
                            text-sm
                            font-medium
                            text-white
                            shadow-sm
                            transition-colors
                            hover:bg-zinc-800
                            dark:bg-zinc-100
                            dark:text-zinc-900
                            dark:hover:bg-zinc-200
                        "
          >
            <Plus
              size={17}
              strokeWidth={2}
            />

            <span>
              Adicionar contrato
            </span>
          </motion.button>
        </motion.div>

        <TabelaContratos
          pesquisa={pesquisa}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {menuAbertoChamadas && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() => {
                if (!loading) {
                  fecharMenus();
                }
              }}
              className="
                                fixed
                                inset-0
                                z-[999]
                                bg-black/40
                            "
            />

            {/* POPUP */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.97,
                y: -10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                backgroundColor:
                  bg,
                color: text,
              }}
              exit={{
                opacity: 0,
                scale: 0.97,
                y: -10,
              }}
              className="
                                z-[1000]
                                fixed
                                top-1/2
                                left-1/2
                                -translate-x-1/2
                                -translate-y-1/2
                                w-[720px]
                                max-h-[90vh]
                                overflow-y-auto
                                p-6
                                rounded-lg
                                shadow-xl
                            "
            >
              {/* TÍTULO */}
              <motion.div className="flex items-center justify-between mb-8">
                <motion.div>
                  <motion.h2 className="text-xl font-bold">
                    Criar contrato
                  </motion.h2>

                  <motion.p
                    className="text-xs mt-1"
                    animate={{
                      color: muted,
                    }}
                  >
                    Preencha os dados e envie o PDF do contrato.
                  </motion.p>
                </motion.div>

                <motion.button
                  type="button"
                  disabled={
                    loading
                  }
                  onClick={
                    fecharMenus
                  }
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="p-2 rounded-md"
                  animate={{
                    color: muted,
                  }}
                >
                  <X size={20} />
                </motion.button>
              </motion.div>

              <motion.form
                onSubmit={
                  submitContrato
                }
                className="space-y-5"
              >
                {/* EMPRESA + SERVIÇO */}
                <motion.div className="grid grid-cols-2 gap-4">
                  {/* EMPRESA */}
                  <motion.div>
                    <motion.label
                      className="
                                                block
                                                text-xs
                                                font-mono
                                                tracking-widest
                                                uppercase
                                                mb-2
                                            "
                      style={{
                        color: muted,
                      }}
                    >
                      Empresa:
                    </motion.label>

                    <motion.input
                      type="text"
                      value={
                        empresa
                      }
                      onChange={(
                        e
                      ) =>
                        setEmpresa(
                          e
                            .target
                            .value
                        )
                      }
                      placeholder="Ex: Microsoft"
                      className="
                                                w-full
                                                px-4
                                                py-3
                                                text-sm
                                                border
                                                outline-none
                                                rounded-sm
                                            "
                      animate={{
                        background:
                          inputBg,
                        borderColor:
                          border,
                        color: text,
                      }}
                      onFocus={(
                        e
                      ) =>
                      (e.target.style.borderColor =
                        accent)
                      }
                      onBlur={(
                        e
                      ) =>
                      (e.target.style.borderColor =
                        border)
                      }
                    />
                  </motion.div>

                  {/* SERVIÇO */}
                  <motion.div>
                    <motion.label
                      className="
                                                block
                                                text-xs
                                                font-mono
                                                tracking-widest
                                                uppercase
                                                mb-2
                                            "
                      style={{
                        color: muted,
                      }}
                    >
                      Serviço:
                    </motion.label>

                    <motion.input
                      type="text"
                      value={
                        servico
                      }
                      onChange={(
                        e
                      ) =>
                        setServico(
                          e
                            .target
                            .value
                        )
                      }
                      placeholder="Ex: Licenciamento de software"
                      className="
                                                w-full
                                                px-4
                                                py-3
                                                text-sm
                                                border
                                                outline-none
                                                rounded-sm
                                            "
                      animate={{
                        background:
                          inputBg,
                        borderColor:
                          border,
                        color: text,
                      }}
                      onFocus={(
                        e
                      ) =>
                      (e.target.style.borderColor =
                        accent)
                      }
                      onBlur={(
                        e
                      ) =>
                      (e.target.style.borderColor =
                        border)
                      }
                    />
                  </motion.div>
                </motion.div>

                {/* DATAS */}
                <motion.div className="grid grid-cols-2 gap-4">
                  {/* DATA INÍCIO */}
                  <motion.div>
                    <motion.label
                      className="
                                                block
                                                text-xs
                                                font-mono
                                                tracking-widest
                                                uppercase
                                                mb-2
                                            "
                      style={{
                        color: muted,
                      }}
                    >
                      Data de início:
                    </motion.label>

                    <motion.input
                      type="date"
                      value={
                        dataInicio
                      }
                      onChange={(
                        e
                      ) =>
                        setDataInicio(
                          e
                            .target
                            .value
                        )
                      }
                      className="
                                                w-full
                                                px-4
                                                py-3
                                                text-sm
                                                border
                                                outline-none
                                                rounded-sm
                                            "
                      animate={{
                        background:
                          inputBg,
                        borderColor:
                          border,
                        color: text,
                      }}
                      onFocus={(
                        e
                      ) =>
                      (e.target.style.borderColor =
                        accent)
                      }
                      onBlur={(
                        e
                      ) =>
                      (e.target.style.borderColor =
                        border)
                      }
                    />
                  </motion.div>

                  {/* DATA FIM */}
                  <motion.div>
                    <motion.label
                      className="
                                                block
                                                text-xs
                                                font-mono
                                                tracking-widest
                                                uppercase
                                                mb-2
                                            "
                      style={{
                        color: muted,
                      }}
                    >
                      Data de fim:
                    </motion.label>

                    <motion.input
                      type="date"
                      value={
                        dataFim
                      }
                      onChange={(
                        e
                      ) =>
                        setDataFim(
                          e
                            .target
                            .value
                        )
                      }
                      className="
                                                w-full
                                                px-4
                                                py-3
                                                text-sm
                                                border
                                                outline-none
                                                rounded-sm
                                            "
                      animate={{
                        background:
                          inputBg,
                        borderColor:
                          border,
                        color: text,
                      }}
                      onFocus={(
                        e
                      ) =>
                      (e.target.style.borderColor =
                        accent)
                      }
                      onBlur={(
                        e
                      ) =>
                      (e.target.style.borderColor =
                        border)
                      }
                    />
                  </motion.div>
                </motion.div>

                {/* VALOR MENSAL */}
                <motion.div>
                  <motion.label
                    className="
                                            block
                                            text-xs
                                            font-mono
                                            tracking-widest
                                            uppercase
                                            mb-2
                                        "
                    style={{
                      color: muted,
                    }}
                  >
                    Valor mensal:
                  </motion.label>

                  <motion.input
                    type="text"
                    inputMode="decimal"
                    value={
                      valorMensal
                    }
                    onChange={(
                      e
                    ) =>
                      setValorMensal(
                        e
                          .target
                          .value
                      )
                    }
                    placeholder="Ex: 1299,90"
                    className="
                                            w-full
                                            px-4
                                            py-3
                                            text-sm
                                            border
                                            outline-none
                                            rounded-sm
                                        "
                    animate={{
                      background:
                        inputBg,
                      borderColor:
                        border,
                      color: text,
                    }}
                    onFocus={(
                      e
                    ) =>
                    (e.target.style.borderColor =
                      accent)
                    }
                    onBlur={(
                      e
                    ) =>
                    (e.target.style.borderColor =
                      border)
                    }
                  />
                </motion.div>


                {/* PDF */}
                <motion.div>
                  <motion.label
                    className="
                                            block
                                            text-xs
                                            font-mono
                                            tracking-widest
                                            uppercase
                                            mb-2
                                        "
                    style={{
                      color: muted,
                    }}
                  >
                    PDF do contrato:
                  </motion.label>

                  <input
                    id="arquivo-contrato"
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={
                      selecionarArquivo
                    }
                    className="hidden"
                  />

                  {!arquivo ? (
                    <motion.label
                      htmlFor="arquivo-contrato"
                      whileHover={{
                        borderColor:
                          primary,
                        backgroundColor:
                          darkMode
                            ? "#1e1e24"
                            : "#f1f1f7",
                      }}
                      whileTap={{
                        scale: 0.99,
                      }}
                      className="
                                                flex
                                                flex-col
                                                items-center
                                                justify-center
                                                gap-3
                                                w-full
                                                py-8
                                                border
                                                border-dashed
                                                rounded-sm
                                                cursor-pointer
                                            "
                      animate={{
                        background:
                          inputBg,
                        borderColor:
                          border,
                      }}
                    >
                      <motion.div
                        animate={{
                          color: muted,
                        }}
                      >
                        <Upload
                          size={
                            30
                          }
                        />
                      </motion.div>

                      <div className="text-center">
                        <p className="text-sm font-medium">
                          Clique para selecionar o PDF
                        </p>

                        <p
                          className="text-xs mt-1"
                          style={{
                            color: muted,
                          }}
                        >
                          Apenas PDF · máximo 20 MB
                        </p>
                      </div>
                    </motion.label>
                  ) : (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="
                                                flex
                                                items-center
                                                justify-between
                                                gap-4
                                                px-4
                                                py-4
                                                border
                                                rounded-sm
                                            "
                      style={{
                        background:
                          inputBg,
                        borderColor:
                          border,
                      }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <motion.div
                          className="shrink-0"
                          animate={{
                            color: primary,
                          }}
                        >
                          <FileText
                            size={
                              25
                            }
                          />
                        </motion.div>

                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">
                            {
                              arquivo.name
                            }
                          </p>

                          <p
                            className="text-xs mt-1"
                            style={{
                              color: muted,
                            }}
                          >
                            {(
                              arquivo.size /
                              1024 /
                              1024
                            ).toFixed(
                              2
                            )}{" "}
                            MB
                          </p>
                        </div>
                      </div>

                      <motion.button
                        type="button"
                        onClick={
                          removerArquivo
                        }
                        disabled={
                          loading
                        }
                        whileHover={{
                          scale: 1.05,
                        }}
                        whileTap={{
                          scale: 0.95,
                        }}
                        className="shrink-0 p-2 rounded-md"
                        animate={{
                          color: "#ef4444",
                        }}
                      >
                        <X size={18} />
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>

                {/* ERROS */}
                <AnimatePresence>
                  {erros !==
                    "" && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                        }}
                        className="
                                                px-4
                                                py-3
                                                text-xs
                                                font-mono
                                                rounded-sm
                                                whitespace-pre-line
                                            "
                        style={{
                          background:
                            "#7f1d1d22",
                          color: "#ef4444",
                          border:
                            "1px solid #ef444440",
                        }}
                      >
                        {
                          erros
                        }
                      </motion.div>
                    )}
                </AnimatePresence>

                {/* ENVIAR */}
                <motion.button
                  type="submit"
                  disabled={
                    loading
                  }
                  whileHover={{
                    scale: 1.01,
                  }}
                  whileTap={{
                    scale: 0.99,
                  }}
                  className="
                                        w-full
                                        py-3
                                        text-sm
                                        font-semibold
                                        tracking-wider
                                        rounded
                                        mt-2
                                    "
                  animate={{
                    background:
                      loading
                        ? muted
                        : primary,
                    color: "#ffffff",
                    opacity:
                      loading
                        ? 0.6
                        : 1,
                  }}
                  onMouseEnter={(
                    e
                  ) => {
                    if (
                      !loading
                    ) {
                      (
                        e.target as HTMLElement
                      ).style.background =
                        primaryHover;
                    }
                  }}
                  onMouseLeave={(
                    e
                  ) => {
                    if (
                      !loading
                    ) {
                      (
                        e.target as HTMLElement
                      ).style.background =
                        primary;
                    }
                  }}
                >
                  {loading ? (
                    <motion.span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>

                      Enviando contrato...
                    </motion.span>
                  ) : (
                    "Criar contrato"
                  )}
                </motion.button>

                {/* CANCELAR */}
                <motion.button
                  type="button"
                  disabled={
                    loading
                  }
                  onClick={
                    fecharMenus
                  }
                  whileHover={{
                    scale: 1.01,
                  }}
                  whileTap={{
                    scale: 0.99,
                  }}
                  className="
                                        w-full
                                        py-3
                                        text-sm
                                        font-semibold
                                        tracking-wider
                                        rounded
                                        mt-2
                                    "
                  animate={{
                    background:
                      "#dc0909",
                    color: "#ffffff",
                    opacity:
                      loading
                        ? 0.6
                        : 1,
                  }}
                >
                  Cancelar
                </motion.button>
              </motion.form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}