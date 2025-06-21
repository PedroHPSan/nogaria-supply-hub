
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SendReportRequest {
  leadId: string;
  email: string;
  reportData: any;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const sendEmailWithRetry = async (email: string, reportHtml: string, pdfBuffer: Uint8Array, leadId: string, attempts = 5): Promise<boolean> => {
  const sendGridApiKey = Deno.env.get('SENDGRID_API_KEY');
  
  if (!sendGridApiKey) {
    console.error('SendGrid API key not found');
    return false;
  }

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sendGridApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email }],
            subject: 'Seu Relatório de Suprimentos de Limpeza - Nogária'
          }],
          from: { email: 'relatorios@nogaria.com.br', name: 'Nogária Suprimentos' },
          content: [{
            type: 'text/html',
            value: reportHtml
          }],
          attachments: [{
            content: btoa(String.fromCharCode(...pdfBuffer)),
            filename: `relatorio-limpeza-${leadId}.pdf`,
            type: 'application/pdf',
            disposition: 'attachment'
          }]
        })
      });

      if (response.ok) {
        console.log(`Email sent successfully on attempt ${attempt}`);
        return true;
      }

      const errorText = await response.text();
      console.error(`SendGrid error (attempt ${attempt}):`, response.status, errorText);
      
      if (attempt < attempts) {
        const delay = Math.pow(2, attempt - 1) * 60000; // Exponential backoff: 60s, 120s, 240s, 480s
        console.log(`Retrying in ${delay}ms...`);
        await sleep(delay);
      }
    } catch (error) {
      console.error(`Email send error (attempt ${attempt}):`, error);
      
      if (attempt < attempts) {
        const delay = Math.pow(2, attempt - 1) * 60000;
        console.log(`Retrying in ${delay}ms...`);
        await sleep(delay);
      }
    }
  }

  // Final failure - send Slack alert
  await sendSlackAlert(email, leadId);
  return false;
};

const sendSlackAlert = async (email: string, leadId: string) => {
  const slackWebhook = Deno.env.get('NOGARIA_ALERTS_SLACK_WEBHOOK');
  
  if (!slackWebhook) {
    console.error('Slack webhook not configured');
    return;
  }

  try {
    await fetch(slackWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `🚨 Falha no envio de e-mail - Calculadora Nogária`,
        attachments: [{
          color: 'danger',
          fields: [
            { title: 'Email', value: email, short: true },
            { title: 'Lead ID', value: leadId, short: true },
            { title: 'Timestamp', value: new Date().toISOString(), short: false }
          ]
        }]
      })
    });
  } catch (error) {
    console.error('Failed to send Slack alert:', error);
  }
};

const generateReportHTML = (calculationResult: any, leadData: any): string => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Relatório de Suprimentos de Limpeza - Nogária</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #0b162d 0%, #02477e 100%); color: white; padding: 30px; text-align: center; }
        .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        .subtitle { font-size: 16px; opacity: 0.9; }
        .content { padding: 30px; }
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
        .summary-card { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; border-left: 4px solid #52ff7f; }
        .summary-value { font-size: 24px; font-weight: bold; color: #0b162d; margin-bottom: 5px; }
        .summary-label { color: #666; font-size: 14px; }
        .section { margin: 30px 0; }
        .section-title { font-size: 20px; color: #0b162d; margin-bottom: 15px; border-bottom: 2px solid #52ff7f; padding-bottom: 5px; }
        .product-list { background: #f8f9fa; padding: 20px; border-radius: 8px; }
        .product-item { margin: 10px 0; padding: 10px; background: white; border-radius: 5px; }
        .savings-highlight { background: linear-gradient(135deg, #52ff7f 0%, #4ccc6a 100%); color: #0b162d; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
        .footer { background: #0b162d; color: white; padding: 20px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Nogária</div>
          <div class="subtitle">Relatório Personalizado de Suprimentos de Limpeza</div>
        </div>
        
        <div class="content">
          <div class="section">
            <h2 class="section-title">Resumo Executivo</h2>
            <div class="summary-grid">
              <div class="summary-card">
                <div class="summary-value">${calculationResult.numeroFuncionarios}</div>
                <div class="summary-label">Funcionários</div>
              </div>
              <div class="summary-card">
                <div class="summary-value">${calculationResult.totalAreaM2.toLocaleString('pt-BR')} m²</div>
                <div class="summary-label">Área Total</div>
              </div>
              <div class="summary-card">
                <div class="summary-value">${formatCurrency(calculationResult.custoComDesconto)}</div>
                <div class="summary-label">Custo Mensal</div>
              </div>
              <div class="summary-card">
                <div class="summary-value">${calculationResult.percentualDesconto}%</div>
                <div class="summary-label">Desconto</div>
              </div>
            </div>
          </div>

          <div class="savings-highlight">
            <h3>💰 Economia Anual Estimada</h3>
            <div style="font-size: 28px; font-weight: bold;">
              ${formatCurrency((calculationResult.custoMensalTotal - calculationResult.custoComDesconto) * 12)}
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">Produtos Recomendados</h2>
            <div class="product-list">
              ${Object.entries(calculationResult.productsByCategory || {}).map(([category, products]: [string, any]) => `
                <h4>${category}</h4>
                ${Array.isArray(products) ? products.map((product: any) => `
                  <div class="product-item">
                    <strong>${product.name}</strong><br>
                    Quantidade mensal: ${product.monthly_quantity}<br>
                    Preço unitário: ${formatCurrency(product.unit_price)}<br>
                    Total mensal: ${formatCurrency(product.monthly_cost)}
                  </div>
                `).join('') : ''}
              `).join('')}
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">Dados da Empresa</h2>
            <p><strong>Empresa:</strong> ${leadData.company_name}</p>
            <p><strong>Contato:</strong> ${leadData.full_name}</p>
            <p><strong>Email:</strong> ${leadData.business_email}</p>
            <p><strong>Telefone:</strong> ${leadData.phone}</p>
            ${leadData.cnpj ? `<p><strong>CNPJ:</strong> ${leadData.cnpj}</p>` : ''}
            ${leadData.company_segment ? `<p><strong>Segmento:</strong> ${leadData.company_segment}</p>` : ''}
          </div>
        </div>

        <div class="footer">
          <p>Relatório gerado em ${new Date().toLocaleDateString('pt-BR')}</p>
          <p>Nogária Suprimentos Corporativos - (91) 99371-7808</p>
          <p>vendas@nogaria.com.br</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const generatePDF = async (html: string): Promise<Uint8Array> => {
  // This would require a PDF generation service
  // For now, we'll create a simple text-based PDF placeholder
  const pdfContent = `PDF Report would be generated from HTML here`;
  return new TextEncoder().encode(pdfContent);
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { leadId, email, reportData }: SendReportRequest = await req.json();

    console.log('Processing report for lead:', leadId);

    // Generate HTML report
    const reportHtml = generateReportHTML(reportData.calculationResult, reportData.leadData);
    
    // Generate PDF (placeholder for now)
    const pdfBuffer = await generatePDF(reportHtml);

    // Send email with retry logic
    const emailSent = await sendEmailWithRetry(email, reportHtml, pdfBuffer, leadId);

    // Store the HTML report in the database for later retrieval
    await supabase
      .from('calculator_results')
      .update({ 
        recommendations: { 
          ...reportData.calculationResult,
          reportHtml,
          emailSent,
          lastEmailAttempt: new Date().toISOString()
        }
      })
      .eq('id', reportData.resultId);

    return new Response(JSON.stringify({
      success: true,
      emailSent,
      reportHtml,
      leadId
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: any) {
    console.error('Error in send-calculator-report:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
};

serve(handler);
