const sets = [
  "BOSH.jpg",
  "WIRA.jpg",
  "SHVI.jpg",
  "TDIL.jpg",
  "INOV.jpg",
  "DESO.jpg",
  "RATE.jpg",
  "FUEN.jpg",
  "MACR.jpg",
  "PEVO.jpg",
  "COTD.jpg",
  "SPWA.jpg",
  "CIBR.jpg",
  "EXFO.jpg",
  "FLOD.jpg",
  "DASA.jpg",
  "CYHO.jpg",
  "SHVA.jpg",
  "SOFU.jpg",
  "HISU.jpg",
  "SAST.jpg",
  "INCH.jpg",
  "DUSA.jpg",
  "DUPO.jpg",
  "DANE.jpg",
  "RIRA.jpg",
  "FIGA.jpg",
  "CHIM.jpg",
  "MYFI.jpg",
  "IGAS.jpg",
  "DUOV.jpg",
  "SESL.jpg",
  "ETCO.jpg",
  "TOCH.jpg",
  "ROTD.jpg",
  "PHRA.jpg",
  "GEIM.jpg",
  "BLVO.jpg",
  "ANGU.jpg",
  "GFTP.jpg",
  "LIOV.jpg",
  "KICO.jpg",
  "LOB.jpg",
  "MRD.jpg",
  "MRL.jpg",
  "MRL.jpg",
  "PSV.jpg",
  "LON.jpg",
  "LOD.jpg",
  "PGD.jpg",
  "MFC.jpg",
  "DCR.jpg",
  "IOC.jpg",
  "AST.jpg",
  "SOD.jpg",
  "RDS.jpg",
  "FET.jpg",
  "TLM.jpg",
  "CRV.jpg",
  "EEN.jpg",
  "SOI.jpg",
  "EOJ.jpg",
  "POTD.jpg",
  "CDIP.jpg",
  "STON.jpg",
  "FOTB.jpg",
  "TAEV.jpg",
  "GLAS.jpg",
  "PTDN.jpg",
  "LODT.jpg",
  "TDGS.jpg",
  "CSOC.jpg",
  "CRMS.jpg",
  "RGBT.jpg",
  "ANPR.jpg",
  "SOVR.jpg",
  "ABPF.jpg",
  "TSHD.jpg",
  "DREV.jpg",
  "STBL.jpg",
  "STOR.jpg",
  "EXVC.jpg",
  "GENF.jpg",
  "PHSW.jpg",
  "ORCS.jpg",
  "GAOV.jpg",
  "REDU.jpg",
  "ABYR.jpg",
  "CBLZ.jpg",
  "LTGY.jpg",
  "JOTL.jpg",
  "SHSP.jpg",
  "LVAL.jpg",
  "PRIO.jpg",
  "DUEA.jpg",
  "NECH.jpg",
  "SECE.jpg",
  "CROS.jpg",
  "CORE.jpg",
  "DOCS.jpg",
  "THSF.jpg",
  "HSRD.jpg",
  "DB1.jpg",
  "DB2.jpg",
  "DR1.jpg",
  "DR2.jpg",
  "DR3.jpg",
  "DR4.jpg",
  "DLG1.jpg",
  "RP01.jpg",
  "RP02.jpg",
  "MIL1.jpg",
  "MP1.jpg",
  "MP2.jpg",
  "HA01.jpg",
  "HA02.jpg",
  "HA03.jpg",
  "HA04.jpg",
  "HA05.jpg",
  "HA06.jpg",
  "HA07.jpg",
  "MP14.jpg",
  "MP15.jpg",
  "MP16.jpg",
  "MP17.jpg",
  "MP18.jpg",
  "MP19.jpg",
  "MP20.jpg",
  "RYMP.jpg",
  "LCGX.jpg",
  "LCYW.jpg",
  "LCJW.jpg",
  "LC5D.jpg",
  "LCKC.jpg",
  "LEDU.jpg",
  "LED2.jpg",
  "LED3.jpg",
  "LED4.jpg",
  "LED5.jpg",
  "LED6.jpg",
  "LDS1.jpg",
  "LED7.jpg",
  "LDS2.jpg",
  "NUMH.jpg",
  "DRLG.jpg",
  "DRL2.jpg",
  "DRL3.jpg",
  "BLLR.jpg",
  "BLRR.jpg",
  "BLHR.jpg",
  "BLAR.jpg",
  "DLCS.jpg",
  "DP1.jpg",
  "DP2.jpg",
  "DP03.jpg",
  "DP04.jpg",
  "DP05.jpg",
  "DP06.jpg",
  "DP07.jpg",
  "DP08.jpg",
  "DP09.jpg",
  "DP10.jpg",
  "DP11.jpg",
  "DPYG.jpg",
  "DPKB.jpg",
  "DPBC.jpg",
  "DPRP.jpg",
  "DPDG.jpg",
  "GLD1_alt.jpg",
  "GLD2_alt.jpg",
  "GLD3_alt.jpg",
  "GLD4_alt.jpg",
  "GLD5_alt.jpg",
  "PGLD_2.jpg",
  "PGL2_2.jpg",
  "PGL3_2.jpg",
  "MAGO.jpg",
  "TP1.jpg",
  "TP2.jpg",
  "TP3.jpg",
  "TP4.jpg",
  "TP5.jpg",
  "TP6.jpg",
  "TP7.jpg",
  "TP8.jpg",
  "CP01.jpg",
  "CP02.jpg",
  "CP03.jpg",
  "CP04.jpg",
  "CP05.jpg",
  "CP06.jpg",
  "CP07.jpg",
  "CP08.jpg",
  "OP01.jpg",
  "OP02.jpg",
  "OP03.jpg",
  "OP04.jpg",
  "OP05.jpg",
  "OP06.jpg",
  "OP07.jpg",
  "OP08.jpg",
  "OP09.jpg",
  "OP10.jpg",
  "OP11.jpg",
  "OP12.jpg",
  "OP13.jpg",
  "OP14.jpg",
  "OP15.jpg",
  "OP16.jpg",
  "TU01.jpg",
  "TU02.jpg",
  "TU03.jpg",
  "TU04.jpg",
  "TU05.jpg",
  "TU06.jpg",
  "TU07.jpg",
  "TU08.jpg",
  "AP01.jpg",
  "AP02.jpg",
  "AP03.jpg",
  "AP04.jpg",
  "AP05.jpg",
  "AP06.jpg",
  "AP07.jpg",
  "AP08.jpg",
  "SP13.jpg",
  "SP14.jpg",
  "SP15.jpg",
  "SP17.jpg",
  "SP18.jpg",
  "YMP1.jpg",
  "MVP1.jpg",
  "BP01.jpg",
  "BP02.jpg",
  "BP03.jpg",
  "PP01.jpg",
  "PP02.jpg",
  "SBLS.jpg",
  "SBAD.jpg",
  "SBSC.jpg",
  "SBTK.jpg",
  "LB.jpg",
  "PG.jpg",
  "RB.jpg",
  "ME.jpg",
  "MR.jpg",
  "PS.jpg",
  "CA.jpg",
  "TB.jpg",
  "SM.jpg",
  "LN.jpg",
  "SC.jpg",
  "MA.jpg",
  "PH.jpg",
  "301.jpg",
  "302.jpg",
  "303.jpg",
  "304.jpg",
  "305.jpg",
  "306.jpg",
  "307.jpg",
  "308.jpg",
  "309.jpg",
  "SOD.jpg",
  "RDS.jpg",
  "FET.jpg",
  "TLM.jpg",
  "CRV.jpg",
  "EEN.jpg",
  "SOI.jpg",
  "EOJ.jpg",
  "POTD.jpg",
  "CDIP.jpg",
  "STON.jpg",
  "FOTB.jpg",
  "TAEV.jpg",
  "GLAS.jpg",
  "PTDN.jpg",
  "LODT.jpg",
  "TDGS.jpg",
  "CSOC.jpg",
  "CRMS.jpg",
  "RGBT.jpg",
  "ANPR.jpg",
  "SOVR.jpg",
  "ABPF.jpg",
  "TSHD.jpg",
  "DREV.jpg",
  "STBL.jpg",
  "STOR.jpg",
  "EXVC.jpg",
  "GENF.jpg",
  "PHSW.jpg",
  "ORCS.jpg",
  "GAOV.jpg",
  "REDU.jpg",
  "ABYR.jpg",
  "CBLZ.jpg",
  "LTGY.jpg",
  "JOTL.jpg",
  "SHSP.jpg",
  "LVAL.jpg",
  "PRIO.jpg",
  "DUEA.jpg",
  "NECH.jpg",
  "SECE.jpg",
  "CROS.jpg",
  "CORE.jpg",
  "DOCS.jpg",
  "BOSH.jpg",
  "SHVI.jpg",
  "TDIL.jpg",
  "INOV.jpg",
  "RATE.jpg",
  "MACR.jpg",
  "COTD.jpg",
  "CIBR.jpg",
  "EXFO.jpg",
  "FLOD.jpg",
  "CYHO.jpg",
  "SOFU.jpg",
  "SAST.jpg",
  "DANE.jpg",
  "RIRA.jpg",
  "CHIM.jpg",
  "IGAS.jpg",
  "ETCO.jpg",
  "ROTD.jpg",
  "PHRA.jpg",
  "BLVO.jpg",
  "LIOV.jpg",
  "BOO1.jpg",
  "BOO2.jpg",
  "BOO3.jpg",
  "BOO4.jpg",
  "BOO5.jpg",
  "BOO6.jpg",
  "BOO7.jpg",
  "VOL1.jpg",
  "VOL2.jpg",
  "VOL3.jpg",
  "VOL4.jpg",
  "VOL5.jpg",
  "VOL6.jpg",
  "VOL7.jpg",
];

const fetch = require("node-fetch");
const fs = require("fs");

const baseUrl = "https://ygoprodeck.com/pics_sets/";

const downloadImages = async () => {
  for (const imageName of sets) {
    const url = `${baseUrl}${imageName}`;
    const res = await fetch(url);
    await new Promise((resolve, reject) => {
      const fileStream = fs.createWriteStream(`./images/${imageName}`);
      res.body.pipe(fileStream);
      res.body.on("error", (err) => {
        reject(err);
      });
      fileStream.on("finish", function () {
        resolve();
      });
    });
  }
};

(async function () {
  await downloadImages();
})();
