import paymentQr from "@/assets/payment-qr-code.png";
import logo from "@/assets/tecman-logo.jpg";
import { ServiceOrders } from "@/types/serviceOrders";
import { Text } from "@mantine/core";
import "./styles.css";

interface GaranteeReportProps {
  componentRef: React.RefObject<HTMLDivElement>;
  data: ServiceOrders;
}

export const GaranteeReport = ({ componentRef, data }: GaranteeReportProps) => {
  return (
    <div style={{ margin: "1rem" }} ref={componentRef}>
      <header>
        <section className="data-header">
          <div className="header-grid">
            <div className="left-data-section">
              <div className="header-title">
                <h3>
                  ASSISTÊNCIA TÉCNICA ESPECIALIZADA | VENDAS DE PEÇAS E
                  CONSERTOS (TODAS AS MARCAS)
                </h3>
              </div>
              <div className="header-subtitle">
                <p>
                  AQUECEDORES | GELADEIRAS | MÁQUINAS DE LAVAR | FOGÕES
                  (RESIDENCIAL/INDUSTRIAL) | LAVA-LOUÇAS | AR CONDICIONADO |
                  MICRO-ONDAS | LAVA E SECA
                </p>
              </div>
              <img
                className="logo"
                src={paymentQr}
                alt="logo da Tecman"
                width={100}
              />
              <h4> PIX (CNPJ): 12.218.268/0001-83</h4>
            </div>
            <div className="right-data-section">
              <div className="header-logo">
                <img className="logo" src={logo} alt="logo da Tecman" />
              </div>
              <div className="header-infos-build">
                <span className="header-address">
                  Rua Siqueira Campos, 164, Loja B, Copacabana, Rio de
                  Janeiro/RJ
                </span>
                <span className="header-email">
                  tecmancopacabana.com.br/ tecmancopacabana@gmail.com
                </span>
                <span className="header-phone-pecas">
                  (21)96948-0592 | (21)2548-5464 | (21) 2235-8002
                </span>
                <span className="header-phone-financeiro">
                  (21)98521-9323 FINANCEIRO | (21)98521-9788 PEÇAS
                </span>
              </div>
            </div>
          </div>
        </section>
      </header>
      <main>
        <section className="os-infos">
          <div className="os" style={{ position: "relative" }}>
            <h3 id="os-title">GARANTIA</h3>
            <span
              style={{
                fontSize: 12,
                fontStyle: "italic",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                position: "absolute",
                width: "15rem",
                right: -5,
              }}
            >
              Atendente: {data.createdBy.split(" ")[0]}{" "}
              {data.createdBy.split(" ")[data.createdBy.split(" ").length - 1]}
            </span>
          </div>
          <div className="grid-os">
            <div className="grid-container details">
              <div className="grid-item os-number-cell  borderRightBottomNone">
                <span className="number-os-title">GARANTIA DA OS: </span>
                <span className="number-os blue-info">{data?.id}</span>
                <span
                  className="technician-os-title"
                  style={{ marginLeft: "1rem" }}
                >
                  TÉCNICO:{" "}
                </span>
                <span className="technician-os blue-info">
                  {data?.tecnic.name}
                </span>
              </div>
              <div className="grid-item os-number-cell  borderBottomNone">
                <span className="date-os-title">DATA VISITA: </span>
                <span className="date-os blue-info"></span>
              </div>
            </div>

            <div className="grid-container details">
              <div
                className="grid-item info-client border"
                style={{ borderRight: "none" }}
              >
                <span className="info-client-title">
                  INFORMAÇÕES DO CLIENTE
                </span>

                <div className="data-client">
                  <div>
                    <span className="bold">Cliente: </span>
                    <span className="blue-info" id="clientName">
                      {data?.client.name}
                    </span>
                  </div>
                  <div>
                    <span className="bold">Endereço: </span>
                    <span
                      className="blue-info"
                      id="clientAddress"
                      style={{ textAlign: "start" }}
                    >
                      {data?.street}, {data?.number}, {data?.complement},{" "}
                      {data?.district} {data?.cep}.
                    </span>
                  </div>
                  <div>
                    <span className="bold">Telefone: </span>
                    <span className="blue-info" id="clientPhone">
                      {data.client.phoneNumber
                        .split(",")
                        .filter((phone) => {
                          if (phone !== "" && phone !== undefined) return phone;
                        })
                        .join(" ")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid-item equipment-details border">
                <span className="equipment-details-title">
                  DETALHES DO EQUIPAMENTO
                </span>
                <div className="data-equipment">
                  <div>
                    <span className="os-equipment bold">Equipamento: </span>
                    <span className="blue-info" id="equipment">
                      {data?.equipments !== null
                        ? data?.equipments[0].type
                        : ""}
                    </span>{" "}
                    <span className="os-brand bold">Marca: </span>
                    <span className="blue-info" id="brand">
                      {data?.equipments !== null
                        ? data?.equipments[0].brand
                        : ""}
                    </span>{" "}
                    <span className="os-model bold">Modelo: </span>
                    <span className="blue-info" id="model">
                      {data?.equipments !== null
                        ? data?.equipments[0].model
                        : ""}
                    </span>
                  </div>

                  <Text lineClamp={6} component="span" p={0}>
                    <span className="os-defect bold">
                      Serviço em garantia:{" "}
                    </span>
                    {data?.serviceExecuted}
                  </Text>
                </div>
              </div>
            </div>
            <div className="grid-container details">
              <div className="grid-item os-number-cell  borderTopRightNone">
                <span className="number-os-title">GARANTIA EXECUTADA: </span>
                <span className="number-os blue-info"></span>
              </div>
              <div className="grid-item os-number-cell  borderTopNone">
                <span className="number-os-title">TÉCNICO: </span>
                <span className="number-os blue-info"></span>
              </div>
            </div>
            <div className="grid-container details">
              <div className="grid-item os-number-cell  borderTopRightNone">
                <span className="number-os-title">AUSENTE: </span>
                <span className="number-os blue-info">
                  {data?.absence1 &&
                    new Date(data?.absence1!).toLocaleDateString()}
                </span>
                <span
                  className="number-os-title"
                  style={{ marginLeft: "6rem" }}
                >
                  HORA:{" "}
                </span>
                <span className="number-os blue-info">
                  {data?.absence1 && new Date(data?.absence1!).getHours()}
                </span>
              </div>
              <div className="grid-item os-number-cell  borderTopNone">
                <span className="number-os-title">INFORMOU AUSÊNCIA: </span>
                <span className="number-os blue-info">{data?.obsAbsence}</span>
              </div>
            </div>

            <div className="grid">
              <div className="grid-item  borderTopNone">
                <span className="number-os-title">
                  DEFEITO(S) APRESENTADO(S):
                </span>
                <div className="servico-content">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="grid">
          <div className="grid-item  borderTopNone">
            <span className="number-os-title">ESPECIFICAÇÃO</span>
          </div>

          <div className="grid-item  borderTopNone">
            <div
              className={`servico-content ${
                data.specifications?.length > 0 &&
                data.specifications?.at(0) !== undefined
                  ? ""
                  : "empty"
              }`}
            >
              <span>
                {data.specifications?.length > 0 && data.specifications?.at(0)}
              </span>
            </div>
          </div>
          <div className="grid-item  borderTopNone">
            <div
              className={`servico-content ${
                data.specifications?.length > 0 &&
                data.specifications?.at(1) !== undefined
                  ? ""
                  : "empty"
              }`}
            >
              <span>
                {data.specifications?.length > 0 && data.specifications?.at(1)}
              </span>
            </div>
          </div>
          <div className="grid-item  borderTopNone">
            <div
              className={`servico-content ${
                data.specifications?.length > 0 &&
                data.specifications?.at(2) !== undefined
                  ? ""
                  : "empty"
              }`}
            >
              <span>
                {data.specifications?.length > 0 && data.specifications?.at(2)}
              </span>
            </div>
          </div>
          <div className="grid-item  borderTopNone">
            <div
              className={`servico-content ${
                data.specifications?.length > 0 &&
                data.specifications?.at(3) !== undefined
                  ? ""
                  : "empty"
              }`}
            >
              <span>
                {data.specifications?.length > 0 && data.specifications?.at(3)}
              </span>
            </div>
          </div>
          <div className="grid-item  borderTopNone">
            <div
              className={`servico-content ${
                data.specifications?.length > 0 &&
                data.specifications?.at(4) !== undefined
                  ? ""
                  : "empty"
              }`}
            >
              <span>
                {data.specifications?.length > 0 && data.specifications?.at(4)}
              </span>
            </div>
          </div>
          <div className="grid-item  borderTopNone">
            <div
              className={`servico-content ${
                data.specifications?.length > 0 &&
                data.specifications?.at(5) !== undefined
                  ? ""
                  : "empty"
              }`}
            >
              <span>
                {data.specifications?.length > 0 && data.specifications?.at(5)}
              </span>
            </div>
          </div>
          <div className="grid-item  borderTopNone">
            <div
              className={`servico-content ${
                data.specifications?.length > 0 &&
                data.specifications?.at(6) !== undefined
                  ? ""
                  : "empty"
              }`}
            >
              <span>
                {data.specifications?.length > 0 && data.specifications?.at(6)}
              </span>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <section className="payment-infos">
          <div className="grid-container">
            <div className="grid-item signature borderTopRightNone">
              <span className="left-tech-signature-title">
                RECEBI A IMPORTÂNCIA DE: ___________ REFERENTE AOS SERVIÇOS
                PRESTADOS CONFORME ORÇAMENTO ACIMA.
              </span>
            </div>
            <div className="grid-item signature borderTopNone">
              <h6 className="signature-technician-title regular">
                ASSINATURA DO TÉCNICO:
              </h6>
              <hr className="hr" />
            </div>
          </div>
          <div className="grid-container">
            <div className="grid-item signature borderRightNone">
              <span className="left-tech-signature-title">
                O EQUIPAMENTO SE ENCONTRA EM PERFEITAS CONDIÇÕES DE USO E FOI
                DEVIDAMENTE TESTADO PELO TÉCNICO NA MINHA PRESENÇA.
              </span>
              <div className="checkbox">
                <span className="checkbox-title">
                  <strong> FIQUEI COM AS PEÇAS USADAS:</strong>
                </span>
                <div className="check">
                  <input type="checkbox" value="" id="checkTrue" />
                  <span>SIM</span>
                </div>
                <div className="check">
                  <input type="checkbox" value="" id="checkFalse" />
                  <span>NÃO</span>
                </div>
              </div>
            </div>
            <div className="grid-item signature border">
              <h6 className="signature-technician-title regular">
                ASSINATURA DO CLIENTE:
              </h6>
              <hr className="hr" />
            </div>
          </div>
        </section>
      </footer>
      <span
        className="footer-text"
        style={{ marginTop: "7rem", position: "absolute", bottom: 0 }}
      >
        <strong>
          SERVIÇO A SER EXECUTADO / TROCA DE MOTOR, CONGELADOR OU CARGA DE GÁS
        </strong>
        Na troca do compressor a empresa não se responsabiliza pelo que possa
        ocorrer com o congelador, como também, na troca do congelador a empresa
        não se responsabiliza pelo compressor. | Na carga de gás a garantia se
        resume unicamente a vazamentos externos.
        <span style={{ marginTop: "1rem", fontSize: "14px" }}>
          <strong>
            Os aparelhos, depois de consertados, ficarão na loja por até 90
            dias, sendo descartados após este período.
          </strong>
        </span>
      </span>
    </div>
  );
};
