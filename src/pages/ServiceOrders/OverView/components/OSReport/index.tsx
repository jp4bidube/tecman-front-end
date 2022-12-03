import "./styles.css";
import logo from "@/assets/tecman-logo.jpg";
import { ServiceOrders } from "@/types/serviceOrders";

interface OSReportProps {
  componentRef: React.RefObject<HTMLDivElement>;
  data: ServiceOrders;
}

export const OSReport = ({ componentRef, data }: OSReportProps) => {
  return (
    <div style={{ margin: "1rem" }} ref={componentRef}>
      <header>
        <section className="data-header">
          <div className="header-grid border">
            <div className="left-data-section">
              <div className="header-title">
                <h3>ASSISTÊNCIA TÉCNICA ESPECIALIZADA | VENDAS DE PEÇAS</h3>
                <h3>E CONSERTOS (TODAS AS MARCAS)</h3>
              </div>
              <div className="header-subtitle">
                <p>
                  AQUECEDORES | GELADEIRAS | MÁQUINAS DE LAVAR | FOGÕES |
                  (RESIDENCIAL/INDUSTRIAL) | LAVA-LOUÇAS | AR CONDICIONADO |
                  MICRO-ONDAS
                </p>
              </div>
            </div>
            <div className="right-data-section">
              <div className="header-logo">
                <img className="logo" src={logo} alt="logo da Tecman" />
              </div>
              <div className="header-infos-build">
                <span className="header-address">
                  Rua Siqueira Campos, 168, Loja A, Copacabana, Rio de
                  Janeiro/RJ
                </span>
                <span className="header-email">
                  E-mail: tecmancopacabana@gmail.com
                </span>
                <span className="header-phone-pecas">
                  (21) 96948-0592 | (21) 2548-5464 | (21) 2235-8002 | (21)
                  98521-9788 PEÇAS
                </span>
                <span className="header-phone-financeiro">
                  (21)98521-9323 FINANCEIRO
                </span>
                <span className="header-type-payment">
                  PIX (CNPJ): 12.218.268/0001-83
                </span>
              </div>
            </div>
          </div>
        </section>
      </header>

      <main>
        <section className="os-infos">
          <div className="os">
            <h3 id="os-title">ORDEM DE SERVIÇO</h3>
          </div>
          <div className="grid-os">
            <div className="grid-container">
              <div className="grid-item os-number-cell border">
                <span className="number-os-title">NÚMERO OS: </span>
                <span className="number-os blue-info">{data?.id}</span>
              </div>
              <div className="grid-item os-date-cell borderLeftNone">
                <span className="date-os-title">DATA: </span>
                <span className="date-os blue-info">
                  {new Date(data?.dateCreated).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <div className="grid-item os-technician-cell borderLeftNone">
                <span className="technician-os-title">TÉCNICO: </span>
                <span className="technician-os blue-info">
                  {data?.tecnic.name}
                </span>
              </div>
              <div className="grid-item os-period-cell borderLeftNone">
                <span className="period-os-title">PERÍODO: </span>
                <span className="period-os blue-info">
                  {data?.periodAttendance}
                </span>
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
                    <span className="os-client">Cliente: </span>
                    <span className="blue-info" id="clientName">
                      {data?.client.name}
                    </span>
                  </div>
                  <div>
                    <span className="os-address">Endereço: </span>
                    <span className="blue-info" id="clientAddress">
                      {data?.street}, {data?.number}, {data?.district},{" "}
                      {data?.cep}.
                    </span>
                  </div>
                  <div>
                    <span className="os-phone">Telefone: </span>
                    <span className="blue-info" id="clientPhone">
                      {data?.client.phoneNumber}
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
                    <span className="os-equipment">Equipamento: </span>
                    <span className="blue-info" id="equipment">
                      {data?.equipments !== null
                        ? data?.equipments[0].type
                        : ""}
                    </span>{" "}
                    |<span className="os-brand">Marca: </span>
                    <span className="blue-info" id="brand">
                      {data?.equipments !== null
                        ? data?.equipments[0].brand
                        : ""}
                    </span>{" "}
                    |<span className="os-model">Modelo: </span>
                    <span className="blue-info" id="model">
                      {data?.equipments !== null
                        ? data?.equipments[0].model
                        : ""}
                    </span>
                  </div>
                  <div>
                    <span className="os-defect">Defeito reclamado: </span>
                    <span className="blue-info" id="defect">
                      {data?.defect}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="orcamento-infos">
          <div className="orcamento">
            <h3 id="orcamento-title">ORÇAMENTO</h3>
          </div>
          <div className="grid-orcamento">
            <div className="grid-container">
              <div className="grid-item cod-peca borderBottomNone">
                <h6 className="cod-peca-title">CÓD PEÇA</h6>
              </div>
              <div className="grid-item quant borderleftBottomNone">
                <h6 className="quant-title">QUANT</h6>
              </div>
              <div className="grid-item especification borderleftBottomNone">
                <h6 className="especification-title">ESPECIFICAÇÃO</h6>
              </div>
              <div className="grid-item pc-base-troca borderleftBottomNone">
                <h6 className="pc-base-troca-title">PÇ BASE TROCA</h6>
              </div>
            </div>
            <div className="grid-orcamento">
              <div className="grid-container cells">
                <div className="grid-item borderBottomNone"></div>
                <div className="grid-item borderleftBottomNone"></div>
                <div className="grid-item borderleftBottomNone"></div>
                <div className="grid-item borderleftBottomNone"></div>
              </div>
              <div className="grid-container cells">
                <div className="grid-item borderBottomNone"></div>
                <div className="grid-item borderleftBottomNone"></div>
                <div className="grid-item borderleftBottomNone"></div>
                <div className="grid-item borderleftBottomNone"></div>
              </div>
              <div className="grid-container cells">
                <div className="grid-item borderBottomNone"></div>
                <div className="grid-item borderleftBottomNone"></div>
                <div className="grid-item borderleftBottomNone"></div>
                <div className="grid-item borderleftBottomNone"></div>
              </div>
              <div className="grid-container cells">
                <div className="grid-item borderBottomNone"></div>
                <div className="grid-item borderleftBottomNone"></div>
                <div className="grid-item borderleftBottomNone"></div>
                <div className="grid-item borderleftBottomNone"></div>
              </div>
              <div className="grid-container cells">
                <div className="grid-item borderBottomNone"></div>
                <div className="grid-item borderleftBottomNone"></div>
                <div className="grid-item borderleftBottomNone"></div>
                <div className="grid-item borderleftBottomNone"></div>
              </div>
            </div>
            <div className="grid-container total">
              <div className="grid-item total-title border">
                <h6 className="total-value-title">
                  VALOR TOTAL DO ORÇAMENTO:{" "}
                </h6>
              </div>
              <div className="grid-item total-value borderLeftNone">
                <h6 className="total-value">R$</h6>
              </div>
            </div>
          </div>
        </section>
        <section className="servico-infos">
          <div className="servico">
            <h3 id="servico-title">SERVIÇO(S)</h3>
          </div>
          <div className="servico-container borderBottomNone">
            <div>
              <div className="servico-legend">
                <h6>SERVIÇO(S) EXECUTADO(S):</h6>
              </div>
              <div className="servico-content">
                <span></span>
              </div>
            </div>
          </div>
          <div className="garantia border">
            <h6 className="garatia-tittle">GARANTIA:</h6>
          </div>
        </section>
      </main>
      <footer>
        <section className="payment-infos">
          <div className="payment">
            <h3 id="payment-title">FINALIZAÇÃO / PAGAMENTO</h3>
          </div>
          <div className="grid-container">
            <div className="grid-item left-tech-signature borderBottomNone">
              <span className="left-tech-signature-title">
                RECEBI A IMPORTÂNCIA DE: ___________ REFERENTE AOS SERVIÇOS
                PRESTADOS CONFORME ORÇAMENTO ACIMA.
              </span>
            </div>
            <div className="grid-item signature borderleftBottomNone">
              <h6 className="signature-technician-title">
                ASSINATURA DO TÉCNICO:
              </h6>
              <hr className="hr" />
            </div>
          </div>
          <div className="grid-container">
            <div className="grid-item left-tech-signature border">
              <span className="left-tech-signature-title">
                O EQUIPAMENTO SE ENCONTRA EM PERFEITAS CONDIÇÕES DE USO E FOI
                DEVIDAMENTE TESTADO PELO TÉCNICO NA MINHA PRESENÇA.
              </span>
              <div className="checkbox">
                <span className="checkbox-title">
                  FIQUEI COM AS PEÇAS USADAS:
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
            <div className="grid-item signature borderLeftNone">
              <h6 className="signature-technician-title">
                ASSINATURA DO CLIENTE:
              </h6>
              <hr className="hr" />
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
};
