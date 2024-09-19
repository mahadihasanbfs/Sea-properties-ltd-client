let text = `Shanta started its journey in 1988 in the ready-made garment (RMG) sector and became one of the forerunners in RMG export by establishing leading industries such as Shanta Garments Ltd, Shanta Industries Ltd, Shanta Washworks Ltd, GDS Chemicals Ltd and Shanta Denims Ltd. Earning a solid reputation as an important vendor for some of the most renowned apparel brands of USA and Europe. Shanta has a long track record of construction since 1991, having been involved in various projects of its own and of the STS Group. It has built the iconic Safura Tower- the 16 storied commercial landmark at Banani, the 200,000 sft multi-facility centrally air conditioned International School Dhaka (ISD) at Bashundhara, the 125,000 sft Delhi Public School at Uttara, state-of-the-art RMG factories such as its 150,000 sft Shanta Industries Ltd, the 150,000 sft Shanta Denims Ltd and the 35,000 sft Shanta Washworks Ltd at Dhaka EPZ. Furthermore, the team was also involved in the construction of Apollo Hospitals Dhaka - the 550,000 sft first multi-disciplinary super-specialty hospital of the country. Eventually exiting the RMG sector and dissolving it's interests to pursue the passion for construction, Shanta Holdings Limited (SHL) was established in 2005 with a mission to change the lifestyle of city dwellers by providing modern, functional and aesthetic living and working spaces that can only be compared to the most successful developers of the globe. With the belief that construction is not just about building structures - but an Art, SHL goes beyond the traditional scopes of property development and integrates the best the world has to offer. Since then, SHL has emerged as the most reputed and fastest growing real estate developer of the country.`


function spilitTextIntoChunks(text, chunkLength) {
      const chunks = [];
      let startIndex = 0;

      while (startIndex < text.length) {
            let chunk = text.substr(startIndex, chunkLength);

            if (!(chunk.endsWith('.'))) {
                  let lastIndexOfDot = chunk.lastIndexOf('.');
                  if (lastIndexOfDot === -1) {
                        chunk = text?.slice(startIndex, text.indexOf('.', startIndex) + 1);
                        chunks.push(chunk);
                        startIndex += (chunk.length + 1);
                  } else {
                        chunk = text?.slice(startIndex, text.indexOf('.', (startIndex + lastIndexOfDot + 1)) + 1);
                        chunks.push(chunk);
                        startIndex += ((startIndex + lastIndexOfDot + 1) + 1);
                  }
            } else {
                  chunks.push(chunk);
                  startIndex += (chunk.lastIndexOf('.') + 1);
            }
      }

      return chunks;
}


let chunk = spilitTextIntoChunks(text, 400)
console.log(chunk.length);
