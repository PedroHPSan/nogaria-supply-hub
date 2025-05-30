
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Building, Plus, Trash2 } from 'lucide-react';
import { AmbienteConfig } from './types';

interface EnvironmentStepProps {
  ambientes: AmbienteConfig[];
  onAddAmbiente: () => void;
  onRemoveAmbiente: (id: string) => void;
  onUpdateAmbiente: (id: string, data: Partial<AmbienteConfig>) => void;
}

const EnvironmentStep = ({ 
  ambientes, 
  onAddAmbiente, 
  onRemoveAmbiente, 
  onUpdateAmbiente 
}: EnvironmentStepProps) => {
  const tiposAmbiente = [
    { value: 'escritorio', label: 'Escritório' },
    { value: 'banheiro_vestiario', label: 'Banheiro/Vestiário' },
    { value: 'cozinha_refeitorio', label: 'Cozinha/Refeitório' },
    { value: 'area_producao', label: 'Área de Produção' },
    { value: 'almoxarifado', label: 'Almoxarifado' },
    { value: 'corredor_hall', label: 'Corredor/Hall' },
    { value: 'area_externa', label: 'Área Externa' },
    { value: 'outro', label: 'Outro' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-grass-green flex items-center justify-between">
            <div className="flex items-center">
              <Building className="w-6 h-6 mr-2" />
              Configuração de Ambientes
            </div>
            <Button
              onClick={onAddAmbiente}
              variant="outline"
              size="sm"
              className="border-grass-green text-grass-green hover:bg-grass-green hover:text-white"
            >
              <Plus className="w-4 h-4 mr-1" />
              Adicionar Ambiente
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {ambientes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Building className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Nenhum ambiente configurado ainda.</p>
              <p className="text-sm">Clique em "Adicionar Ambiente" para começar.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {ambientes.map((ambiente, index) => (
                <Card key={ambiente.id} className="border-l-4 border-l-grass-green">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>Ambiente {index + 1}</span>
                      <Button
                        onClick={() => onRemoveAmbiente(ambiente.id)}
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Tipo do ambiente</Label>
                        <Select
                          value={ambiente.tipo}
                          onValueChange={(value) => onUpdateAmbiente(ambiente.id, { tipo: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            {tiposAmbiente.map(tipo => (
                              <SelectItem key={tipo.value} value={tipo.value}>
                                {tipo.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Área (m²)</Label>
                        <Input
                          type="number"
                          value={ambiente.areaM2 || ''}
                          onChange={(e) => onUpdateAmbiente(ambiente.id, { 
                            areaM2: parseFloat(e.target.value) || 0 
                          })}
                          placeholder="Ex: 50"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    {/* Campos específicos para banheiro/vestiário */}
                    {ambiente.tipo === 'banheiro_vestiario' && (
                      <div className="bg-blue-50 p-4 rounded-lg space-y-4">
                        <h4 className="font-medium text-blue-900">Detalhes do Banheiro/Vestiário</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label>Número de cabines</Label>
                            <Input
                              type="number"
                              value={ambiente.numeroCabines || ''}
                              onChange={(e) => onUpdateAmbiente(ambiente.id, { 
                                numeroCabines: parseInt(e.target.value) || 0 
                              })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Número de mictórios</Label>
                            <Input
                              type="number"
                              value={ambiente.numeroMictorio || ''}
                              onChange={(e) => onUpdateAmbiente(ambiente.id, { 
                                numeroMictorio: parseInt(e.target.value) || 0 
                              })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Número de lavatórios</Label>
                            <Input
                              type="number"
                              value={ambiente.numeroLavatório || ''}
                              onChange={(e) => onUpdateAmbiente(ambiente.id, { 
                                numeroLavatório: parseInt(e.target.value) || 0 
                              })}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Campos específicos para cozinha/refeitório */}
                    {ambiente.tipo === 'cozinha_refeitorio' && (
                      <div className="bg-green-50 p-4 rounded-lg space-y-4">
                        <h4 className="font-medium text-green-900">Detalhes da Cozinha/Refeitório</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label>Número de fogões</Label>
                            <Input
                              type="number"
                              value={ambiente.numeroFogoes || ''}
                              onChange={(e) => onUpdateAmbiente(ambiente.id, { 
                                numeroFogoes: parseInt(e.target.value) || 0 
                              })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Número de geladeiras</Label>
                            <Input
                              type="number"
                              value={ambiente.numeroGeladeiras || ''}
                              onChange={(e) => onUpdateAmbiente(ambiente.id, { 
                                numeroGeladeiras: parseInt(e.target.value) || 0 
                              })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Número de mesas</Label>
                            <Input
                              type="number"
                              value={ambiente.numeroMesas || ''}
                              onChange={(e) => onUpdateAmbiente(ambiente.id, { 
                                numeroMesas: parseInt(e.target.value) || 0 
                              })}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Campo para descrição de "outro" */}
                    {ambiente.tipo === 'outro' && (
                      <div>
                        <Label>Descrição do ambiente</Label>
                        <Input
                          value={ambiente.descricaoOutro || ''}
                          onChange={(e) => onUpdateAmbiente(ambiente.id, { 
                            descricaoOutro: e.target.value 
                          })}
                          placeholder="Descreva o tipo de ambiente"
                          className="mt-1"
                        />
                      </div>
                    )}

                    {/* Questões NR-24 */}
                    <div className="bg-yellow-50 p-4 rounded-lg space-y-3">
                      <h4 className="font-medium text-yellow-900">Questões de Conformidade NR-24</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`pisos-${ambiente.id}`}
                            checked={ambiente.nr24_pisosConservados || false}
                            onCheckedChange={(checked) => onUpdateAmbiente(ambiente.id, { 
                              nr24_pisosConservados: !!checked 
                            })}
                          />
                          <label htmlFor={`pisos-${ambiente.id}`} className="text-sm">
                            Pisos estão conservados e sem irregularidades
                          </label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`paredes-${ambiente.id}`}
                            checked={ambiente.nr24_paredesLavaveisImpermeaveis || false}
                            onCheckedChange={(checked) => onUpdateAmbiente(ambiente.id, { 
                              nr24_paredesLavaveisImpermeaveis: !!checked 
                            })}
                          />
                          <label htmlFor={`paredes-${ambiente.id}`} className="text-sm">
                            Paredes são laváveis e impermeáveis
                          </label>
                        </div>

                        {(ambiente.tipo === 'banheiro_vestiario' || ambiente.tipo === 'cozinha_refeitorio') && (
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`lixeiras-${ambiente.id}`}
                              checked={ambiente.nr24_lixeirasComTampaBanheiroCozinha || false}
                              onCheckedChange={(checked) => onUpdateAmbiente(ambiente.id, { 
                                nr24_lixeirasComTampaBanheiroCozinha: !!checked 
                              })}
                            />
                            <label htmlFor={`lixeiras-${ambiente.id}`} className="text-sm">
                              Lixeiras possuem tampa
                            </label>
                          </div>
                        )}

                        {ambiente.tipo === 'banheiro_vestiario' && (
                          <>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`higienicos-${ambiente.id}`}
                                checked={ambiente.nr24_fornecimentoHigienicosContinuo || false}
                                onCheckedChange={(checked) => onUpdateAmbiente(ambiente.id, { 
                                  nr24_fornecimentoHigienicosContinuo: !!checked 
                                })}
                              />
                              <label htmlFor={`higienicos-${ambiente.id}`} className="text-sm">
                                Fornecimento contínuo de papel higiênico, sabonete e toalhas
                              </label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`absorventes-${ambiente.id}`}
                                checked={ambiente.nr24_coletorAbsorventesFeminino || false}
                                onCheckedChange={(checked) => onUpdateAmbiente(ambiente.id, { 
                                  nr24_coletorAbsorventesFeminino: !!checked 
                                })}
                              />
                              <label htmlFor={`absorventes-${ambiente.id}`} className="text-sm">
                                Coletor para absorventes femininos (se aplicável)
                              </label>
                            </div>
                          </>
                        )}

                        {ambiente.tipo === 'cozinha_refeitorio' && (
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`superficies-${ambiente.id}`}
                              checked={ambiente.nr24_higienizacaoSuperficiesAlimentosCozinha || false}
                              onCheckedChange={(checked) => onUpdateAmbiente(ambiente.id, { 
                                nr24_higienizacaoSuperficiesAlimentosCozinha: !!checked 
                              })}
                            />
                            <label htmlFor={`superficies-${ambiente.id}`} className="text-sm">
                              Higienização adequada de superfícies que entram em contato com alimentos
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnvironmentStep;
